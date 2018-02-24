#!/bin/bash

### ShadowFox updater for Linux
## author: @overdodactyl
## version: 1.1

userChrome="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userChrome.css"
userContent="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userContent.css"

echo -e "\nThis script should be run from inside your Firefox profile.\n"

currdir=$(pwd)

## get the full path of this script (readlink for Linux, greadlink for Mac with coreutils installed)
sfp=$(readlink -f "${BASH_SOURCE[0]}" 2>/dev/null || greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null)

## fallback for Macs without coreutils - may cause problems if symbolic links are encountered
if [ -z "$sfp" ]; then sfp=${BASH_SOURCE[0]}; fi

## change directory to the Firefox profile directory
cd "$(dirname "${sfp}")"

echo -e "\nUpdating userContent.css and userChrome.css for Firefox profile:\n$(pwd)\n"

if [ -e userContent.css ]; then
  echo -e "\nYour current userContent.css file for this profile will be backed up and the latest ShadowFox version from github will take its place.\n"
else
  echo -e "\nA userContent.css file does not exist in this profile. If you continue, the latest ShadowFox version from github will be downloaded.\n"
fi

if [ -e userChrome.css ]; then
  echo -e "\nYour current userChrome.css file for this profile will be backed up and the latest ShadowFox version from github will take its place.\n"
else
  echo -e "\nA userChrome.css file does not exist in this profile. If you continue, the latest ShadowFox version from github will be downloaded.\n"
fi

read -p "Continue Y/N? " -n 1 -r
echo -e "\n\n"

if [[ $REPLY =~ ^[Yy]$ ]]; then

  ## Make chrome directory if it doesn't exist
  mkdir -p chrome;

  ## Move to chrome directory
  cd chrome;

  ## Make ShadowFox_customization directory if it doesn't exist
  mkdir -p ShadowFox_customization;

  ## Create all customization files if they don't exist
  touch ./ShadowFox_customization/colorOverrides.css
  touch ./ShadowFox_customization/internal_UUIDs.txt
  touch ./ShadowFox_customization/userContent_customization.css
  touch ./ShadowFox_customization/userChrome_customization.css

  if [ -e userChrome.css ] || [ -e userContent.css ] ; then
    ## Make chrome backups folder if it doesn't extern
    mkdir -p chrome_backups
  fi
  if [ -e userChrome.css ]; then
    # backup current userChrome.css file
    bakfile="userChrome.backup.$(date +"%Y-%m-%d_%H%M%S")"
    mv userChrome.css "chrome_backups/${bakfile}" && echo "Your previous userChrome.css file was backed up: ${bakfile}"
  fi
  if [ -e userContent.css ]; then
    # backup current userChrome.css file
    bakfile="userContent.backup.$(date +"%Y-%m-%d_%H%M%S")"
    mv userContent.css "chrome_backups/${bakfile}" && echo "Your previous userContent.css file was backed up: ${bakfile}"
  fi

  # download latest ShadowFox userChrome.css
  echo -e "\ndownloading latest ShadowFox userChrome.css file\n"
  curl -O ${userChrome} && echo "ShadowFox userChrome.css has been downloaded"

  # download latest ShadowFox userContent.css
  echo -e "\ndownloading latest ShadowFox userContent.css file\n"
  curl -O ${userContent} && echo "ShadowFox userContent.css has been downloaded"

  if [ -s ./ShadowFox_customization/internal_UUIDs.txt ]; then
    ## Insert any UUIDs defined in internal_UUIDs.txt into userContent.css
    while IFS='' read -r line || [[ -n "$line" ]]; do
        IFS='=' read -r -a array <<< "$line"
        sed -i "s/${array[0]}/${array[1]}/" "userContent.css"
    done < "./ShadowFox_customization/internal_UUIDs.txt"
    echo -e "\nYour internal UUIDs have been inserted.\n"
  else
    echo -e "\nYou have not defined any internal UUIDs for webextensions.\n"
    echo -e "\nIf you choose not to do so, webextensions will not be styled with a dark theme and may have compatibility issues in about:addons.\n"
    echo -e "\nFor more information, see here:\n"
    echo -e "\nhttps://github.com/overdodactyl/ShadowFox/wiki/Altering-webextensions\n"
  fi

  if [ -s ./ShadowFox_customization/colorOverrides.css ]; then
    ## Delete everything inbetween override markers
    sed -i '/--start-indicator-for-updater-scripts: black;/,/--end-indicator-for-updater-scripts: black;/{//!d;}' userContent.css
    sed -i '/--start-indicator-for-updater-scripts: black;/,/--end-indicator-for-updater-scripts: black;/{//!d;}' userChrome.css

    ## Insert everything from colorOverrides.css
    sed -i '/--start-indicator-for-updater-scripts: black;/ r ./ShadowFox_customization/colorOverrides.css' userContent.css
    sed -i '/--start-indicator-for-updater-scripts: black;/ r ./ShadowFox_customization/colorOverrides.css' userChrome.css


    echo -e "\nYour custom colors have been set.\n"
  else
    echo -e "\nYou are using the default colors set by ShadowFox\n"
    echo -e "\nYou can customize the colors used by editing colorOverrides.css\n"
  fi

  if [ -s ./ShadowFox_customization/userContent_customization.css ]; then
    ## Append tweaks to the end of userContent.css
    cat ./ShadowFox_customization/userContent_customization.css >> userContent.css
    echo -e "\nYour custom userContent.css tweaks have been applied.\n"
  else
    echo -e "\nYou do not have any custom userContent.css tweaks.\n"
    echo -e "\nYou can customize userContent.css using userContent_customization.css.\n"
  fi

  if [ -s ./ShadowFox_customization/userChrome_customization.css ]; then
    ## Append tweaks to the end of userContent.css
    cat ./ShadowFox_customization/userChrome_customization.css >> userChrome.css
    echo -e "\nYour custom userChrome.css tweaks have been applied.\n"
  else
    echo -e "\nYou do not have any custom userChrome.css tweaks.\n"
    echo -e "\nYou can customize userChrome.css using userChrome_customization.css.\n"
  fi

else
  echo -e "\nProcess aborted\n"
fi


## change directory back to the original working directory
cd "${currdir}"
