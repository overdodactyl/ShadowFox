option explicit

' ShadowFox updater for Windows
' author: @CarlColijn
' version: 1.1
' ^^^ ensure the version number is a numeric float value!

' the download urls of the files
const chromeFileURL = "https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userChrome.css"
const contentFileURL = "https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userContent.css"
const updaterFileURL = "https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/scripts/ShadowFox_updater_windows.vbs"

' set up the common worker objects and flags
dim vbSection: vbSection = vbNewLine & vbNewLine
const forReading = 1
const adTypeBinary = 1
const adTypeText = 2
const adSaveCreateOverWrite = 2
dim fso: set fso = createObject("Scripting.FileSystemObject")
dim regEx: set regEx = createObject("VBScript.RegExp")
regEx.global = true
regEx.ignoreCase = true
dim shell: set shell = createObject("WScript.Shell")

' vb's IIf replacement
function iif(condition, trueValue, falseValue)
  if condition then
    iif = trueValue
  else
    iif = falseValue
  end if
end function

' does a regex newline-agnostic replacement on the given text
function regExNLReplace(text, pattern, replaceText)
  ' ensure newlines are absent, since VBScript regex can't match 'em
  dim encodedText: encodedText = replace(replace(text, vbCr, chr(1)), vbLf, chr(2))

  ' do the regex replace
  regEx.pattern = pattern
  dim replacedText: replacedText = regEx.replace(encodedText, replaceText)

  ' and decode the newlines again
  regExNLReplace = replace(replace(replacedText, chr(1), vbCr), chr(2), vbLf)
end function

' left-pads the given text to the given length with the given character
' the text is not truncated if longer than the given length
function leftPad(text, length, padChar)
  if len(text) >= length then
    leftPad = text
  else
    leftPad = string(length - len(text), padChar) & text
  end if
end function

' gets a yyyy-mm-dd_hh-mm timestamp
function dateTimeStamp()
  dim present: present = now
  dateTimeStamp = year(present) & "-" & leftPad(month(present), 2, "0") & "-" & leftPad(day(present), 2, "0") & "_" & leftPad(hour(present), 2, "0") & "-" & leftPad(minute(present), 2, "0") & "-" & leftPad(second(present), 2, "0")
end function

' backs up the given file
' creates the backup folder if it doesn't exist yet
' returns the used backup file name
function backupFile(sourceFilePath, backupFolderPath)
  ' determine the backup filename
  dim backupFileName: backupFileName = fso.getBaseName(sourceFilePath) & ".backup." & dateTimeStamp() & "." & fso.getExtensionName(sourceFilePath)
  dim backupFilePath: backupFilePath = fso.buildPath(backupFolderPath, backupFileName)

  ' ensure the backup folder is there
  if not fso.folderExists(backupFolderPath) then
    call fso.createFolder(backupFolderPath)
  end if

  ' backup the file
  call fso.moveFile(sourceFilePath, backupFilePath)

  ' and tell where the backup ended up
  backupFile = backupFileName
end function

' reads the given file's content
function readFileContent(filePath)
  if fso.getFile(filePath).size = 0 then
    readFileContent = ""
  else
    readFileContent = fso.openTextFile(filePath, forReading).readAll()
  end if
end function

' writes the given file's content
function writeFileContent(filePath, content)
  call fso.createTextFile(filePath, true).write(content)
end function

' downloads the given file
' returns the content and if the download succeeded
function downloadFile(url, content)
  on error resume next
    ' download the file content
    dim xmlHttp: set xmlHttp = createObject("Microsoft.XMLHTTP")
    call xmlHttp.Open("GET", url, false)
    call xmlHttp.Send()
    if err.number = 0 then
      ' done -> convert it
      dim stream: set stream = createobject("ADODB.Stream")
      with stream
        .type = adTypeBinary
        call .open
        call .write(xmlHttp.responseBody)
        .position = 0
        .type = adTypeText
        .charSet = "us-ascii"
        content = .readText()
      end with
    end if

    ' and tell if all is OK
    downloadFile = err.number = 0
  on error goto 0
end function

' downloads and saves the given file to the given location
' returns if the download succeeded
function downloadAndSaveFile(url, filePath)
  ' download the file's content
  dim content
  downloadAndSaveFile = downloadFile(url, content)
  if downloadAndSaveFile then
    ' done -> save it's content
    call writeFileContent(filePath, content)
  end if
end function

' ensures consistent line endings in the given text (to just crLf)
function normalizeLineEndings(text)
  normalizeLineEndings = replace(replace(text, vbCrLf, vbLf), vbCr, vbLf)
end function

' ensures the given file is present
' returns the file's content, or "" if not present
function processCustomizationFile(filePath)
  if fso.fileExists(filePath) then
    processCustomizationFile = readFileContent(filePath)
  else
    processCustomizationFile = ""
    call fso.createTextFile(filePath, true)
  end if
end function

' reads in the given ini file
' returns a dict of dicts, where the outer dict keys on the sections and the inner dicts on the keys
function readIni(iniFilePath)
  ' get the ini's content
  dim iniLines: iniLines = split(normalizeLineEndings(readFileContent(iniFilePath)), vbLf)

  ' and parse it
  set readIni = CreateObject("Scripting.Dictionary")
  dim currentSection: set currentSection = Nothing
  dim nextLine
  for each nextLine in iniLines
    ' get the next line
    nextLine = trim(nextLine)
    if len(nextLine) > 0 then
      ' done -> look what we have
      if left(nextLine, 1) = "[" then
        ' a section -> switch to it
        dim nextSectionName: nextSectionName = mid(nextLine, 2, len(nextLine) - 2)
        if readIni.exists(nextSectionName) then
          set currentSection = readIni.item(nextSectionName)
        else
          set currentSection = CreateObject("Scripting.Dictionary")
          set readIni.item(nextSectionName) = currentSection
        end if
      else
        ' a key -> add it
        dim endKeyPos: endKeyPos = inStr(nextLine, "=")
        if endKeyPos >= 1 and not currentSection is nothing then
          dim nextKey: nextKey = trim(left(nextLine, endKeyPos - 1))
          dim nextValue: nextValue = mid(nextLine, endKeyPos + 1)
          currentSection.item(nextKey) = nextValue
        end if
      end if
    end if
  next
end function

' gets the path to the profile folder to update
' returns "" if more than one profile exists but the user cancels
function getProfileFolderPath()
  ' determine where the FireFox files are located
  dim userDataFolderPath: userDataFolderPath = shell.ExpandEnvironmentStrings("%APPDATA%\Mozilla\FireFox")
  dim profileIniFilePath: profileIniFilePath = fso.buildPath(userDataFolderPath, "profiles.ini")

  ' determine where we are located
  dim ourPath: ourPath = fso.getParentFolderName(wscript.scriptFullName)

  ' get the profiles configuration
  dim iniContent: set iniContent = readIni(profileIniFilePath)

  ' extract the names & paths of the profiles found
  dim profilePaths: set profilePaths = CreateObject("Scripting.Dictionary")
  profilePaths.compareMode = VBTextCompare
  dim sectionName
  dim defaultProfileName: defaultProfileName = ""
  dim forcedProfilePath: forcedProfilePath = ""
  for each sectionName in iniContent.keys()
    if lcase(left(sectionName, 7)) = "profile" then
      dim section: set section = iniContent.item(sectionName)
      dim name: name = section.item("Name")
      dim path
      if section.item("IsRelative") = "0" then
        path = section.item("Path")
      else
        path = fso.buildPath(userDataFolderPath, section.item("Path"))
      end if
      if section.exists("Default") then
        defaultProfileName = name
      end if
      if strComp(left(ourPath, len(path)), path, vbTextCompare) = 0 then
        forcedProfilePath = path
      end if
      profilePaths.item(name) = path
    end if
  next

  ' and look what situation we're in
  if len(forcedProfilePath) > 0 then
    ' running from within a profile -> use that one
    getProfileFolderPath = forcedProfilePath
  elseif profilePaths.count = 1 then
    ' just one profile found -> use it
    getProfileFolderPath = profilePaths.items()(0)
  else
    ' more than one profile found -> ask which one to use
    do
      dim prompt: prompt = "Which profile would you like to update ShadowFox in?"
      dim profileName
      dim profileChosen: profileChosen = true
      for each profileName in profilePaths.keys()
        prompt = prompt & vbNewLine & profileName & ": """ & profilePaths.item(profileName) & """"
      next
      dim chosenProfileName: chosenProfileName = trim(inputBox(prompt, "ShadowFox updater", defaultProfileName))
      if len(chosenProfileName) = 0 then
        getProfileFolderPath = ""
      else
        if profilePaths.exists(chosenProfileName) then
          getProfileFolderPath = profilePaths.item(chosenProfileName)
        else
          ' illegal one -> tell
          call msgbox("The profile """ & chosenProfileName & """ doesn't exist; please select one from the list.", vbOKOnly & vbExclamation, "ShadowFox updater")
          profileChosen = false
        end if
      end if
    loop while not profileChosen
  end if
end function

' gets the version of the given updater file
' return "" if not found
function getUpdaterVersion(updaterSourceCode)
  regEx.pattern = "' version: (.*)"
  dim matches: set matches = regEx.execute(updaterSourceCode)
  if matches.count > 0 then
    getUpdaterVersion = matches(0).subMatches(0)
  else
    getUpdaterVersion = ""
  end if
end function

' gets the latest version of the updater
' returns if a newer version was installed
function getLatestUpdater(updaterFilePath)
  ' download the source of the latest updater
  getLatestUpdater = false
  dim latestSource
  if downloadFile(updaterFileURL, latestSource) then
    ' done -> extract it's version
    dim latestVersion: latestVersion = getUpdaterVersion(latestSource)

    ' extract our version
    dim ourVersion: ourVersion = getUpdaterVersion(readFileContent(updaterFilePath))

    ' and see if there is a newer version available
    if latestVersion > ourVersion then
      ' yes -> replace us with it
      dim updaterPath: updaterPath = fso.getParentFolderName(updaterFilePath)
      call backupFile(updaterFilePath, updaterPath)
      call writeFileContent(updaterFilePath, latestSource)
      getLatestUpdater = true
    end if
  end if
end function



' ensure we're up-to-date
dim ourPath: ourPath = wscript.scriptFullName
if getLatestUpdater(ourPath) then
  ' we weren't, but are now -> tell we're going to run it
  call msgbox("There is a new updater script available online.  Your old version has been backed up, and the new one has been downloaded and has replaced this one.  It will now be executed instead.", vbOKOnly, "ShadowFox updater")
  call shell.run("""" & ourPath & """", , false)
else
  ' we are -> look which profile folder to update
  dim profileFolderPath: profileFolderPath = getProfileFolderPath()
  if len(profileFolderPath) > 0 then
    ' done -> determine where the files need to go
    dim chromeFolderPath: chromeFolderPath = fso.buildPath(profileFolderPath, "chrome")
    dim backupFolderPath: backupFolderPath = fso.buildPath(profileFolderPath, "chrome_backups")
    dim chromeFilePath: chromeFilePath = fso.buildPath(chromeFolderPath, "userChrome.css")
    dim contentFilePath: contentFilePath = fso.buildPath(chromeFolderPath, "userContent.css")
    dim customizationsFolderPath: customizationsFolderPath = fso.buildPath(chromeFolderPath, "ShadowFox_customization")
    dim colorOverridesFilePath: colorOverridesFilePath = fso.buildPath(customizationsFolderPath, "colorOverrides.css")
    dim internalUUIDsFilePath: internalUUIDsFilePath = fso.buildPath(customizationsFolderPath, "internal_UUIDs.txt")
    dim chromeCustomizationsFilePath: chromeCustomizationsFilePath = fso.buildPath(customizationsFolderPath, "userChrome_customization.css")
    dim contentCustomizationsFilePath: contentCustomizationsFilePath = fso.buildPath(customizationsFolderPath, "userContent_customization.css")

    ' and ask if we may continue
    dim prompt: prompt = "Updating userContent.css and userChrome.css for Firefox profile:" & vbNewLine & chromeFolderPath & vbNewLine
    if fso.fileExists(contentFilePath) then
      prompt = prompt & vbNewLine & _
        "Your current userContent.css file for this profile will be backed up and the latest ShadowFox version from github will take its place."
    else
      prompt = prompt & vbNewLine & _
        "A userContent.css file does not exist in this profile. If you continue, the latest ShadowFox version from github will be downloaded."
    end if
    if fso.fileExists(chromeFilePath) then
      prompt = prompt & vbNewLine & _
        "Your current userChrome.css file for this profile will be backed up and the latest ShadowFox version from github will take its place."
    else
      prompt = prompt & vbNewLine & _
        "A userChrome.css file does not exist in this profile. If you continue, the latest ShadowFox version from github will be downloaded."
    end if
    if vbNo = msgBox(prompt & vbSection & "Continue?", vbYesNo + vbDefaultButton2 + vbQuestion, "ShadowFox updater") then
      ' no -> tell
      call msgBox("Process aborted.", vbOKOnly, "ShadowFox updater")
    else
      ' yes -> ensure the folders are present
      if not fso.folderExists(chromeFolderPath) then
        call fso.createFolder(chromeFolderPath)
      end if
      if not fso.folderExists(customizationsFolderPath) then
        call fso.createFolder(customizationsFolderPath)
      end if

      ' backup any existing files
      prompt = "Installing new ShadowFox files."
      if fso.fileExists(contentFilePath) then
        prompt = prompt & vbNewLine & _
          "Your previous userContent.css file was backed up: " & backupFile(contentFilePath, backupFolderPath)
      end if
      if fso.fileExists(chromeFilePath) then
        prompt = prompt & vbNewLine & _
          "Your previous userChrome.css file was backed up: " & backupFile(chromeFilePath, backupFolderPath)
      end if

      ' download the latest versions
      dim allOK
      allOK = true
      if _
        not downloadAndSaveFile(chromeFileURL, chromeFilePath) or _
        not downloadAndSaveFile(contentFileURL, contentFilePath) _
      then
        ' error downloading -> tell
        prompt = prompt & vbSection & _
          "There was an error downloading the latest ShadowFox userContent.css and/or userChrome.css files."
        allOK = false
      else
        ' done -> tell
        prompt = prompt & vbSection & _
          "ShadowFox userContent.css and userChrome.css have been downloaded."

        ' read their content to manipulate it
        dim chromeFileContent: chromeFileContent = readFileContent(chromeFilePath)
        dim contentFileContent: contentFileContent = readFileContent(contentFilePath)

        ' do any extension UUID replacements
        dim internalUUIDs: internalUUIDs = processCustomizationFile(internalUUIDsFilePath)
        if len(internalUUIDs) = 0 then
          prompt = prompt & vbSection & _
            "You have not defined any internal UUIDs for webextensions." & vbNewLine & _
            "If you choose not to do so, webextensions will not be styled with a dark theme and may have compatibility issues in about:addons." & vbNewLine & _
            "For more information, see here:" & vbNewLine & _
            "https://github.com/overdodactyl/ShadowFox/wiki/Altering-webextensions"
        else
          dim internalUUID
          for each internalUUID in split(normalizeLineEndings(internalUUIDs), vbLf)
            if instr(internalUUID, "=") > 0 then
              dim replacementParts: replacementParts = split(internalUUID, "=")
              regEx.pattern = replacementParts(0)
              contentFileContent = regEx.replace(contentFileContent, replacementParts(1))
            end if
          next
          prompt = prompt & vbSection & _
            "Your internal UUIDs have been inserted."
        end if

        ' process any color overrides
        dim colorOverrides: colorOverrides = processCustomizationFile(colorOverridesFilePath)
        if len(colorOverrides) = 0 then
          prompt = prompt & vbSection & _
            "You are using the default colors set by ShadowFox." & vbNewLine & _
            "You can customize the colors used by editing colorOverrides.css."
        else
          const replacePattern = "(--start-indicator-for-updater-scripts: black;)(.*)(--end-indicator-for-updater-scripts: black;)"
          dim replaceWith: replaceWith = "$1" & vbNewLine & colorOverrides & vbNewLine & "$3"
          chromeFileContent = regExNLReplace(chromeFileContent, replacePattern, replaceWith)
          contentFileContent = regExNLReplace(contentFileContent, replacePattern, replaceWith)
          prompt = prompt & vbSection & _
            "Your custom colors have been set."
        end if

        ' add on any overrides
        dim contentCustomizations: contentCustomizations = processCustomizationFile(contentCustomizationsFilePath)
        if len(contentCustomizations) = 0 then
          prompt = prompt & vbSection & _
            "You do not have any custom userContent.css tweaks." & vbNewLine & _
            "You can customize userContent.css using userContent_customization.css."
        else
          contentFileContent = contentFileContent & vbSection & contentCustomizations
          prompt = prompt & vbSection & _
            "Your custom userContent.css tweaks have been applied."
        end if
        dim chromeCustomizations: chromeCustomizations = processCustomizationFile(chromeCustomizationsFilePath)
        if len(chromeCustomizations) = 0 then
          prompt = prompt & vbSection & _
            "You do not have any custom userChrome.css tweaks." & vbNewLine & _
            "You can customize userChrome.css using userChrome_customization.css."
        else
          chromeFileContent = chromeFileContent & vbSection & chromeCustomizations
          prompt = prompt & vbSection & _
            "Your custom userChrome.css tweaks have been applied."
        end if

        ' write them out again
        on error resume next
          call fso.createTextFile(chromeFilePath, true).write(chromeFileContent)
          call fso.createTextFile(contentFilePath, true).write(contentFileContent)
          if err.number <> 0 then
            allOK = false
            prompt = prompt & vbSection & _
              "There was an error saving the customized versions of the userChrome.css and/or userContent.css files."
          end if
        on error goto 0
      end if

      ' and tell we're done
      call msgBox(prompt, iif(allOK, vbInformation, vbExclamation), "ShadowFox updater")
    end if
  end if
end if
