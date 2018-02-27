#!/bin/bash

### ShadowFox updater for Linux
## author: @overdodactyl
## version: 1.1

userChrome="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userChrome.css"
userContent="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userContent.css"

echo -e "This script should be run from inside your Firefox profile."

currdir=$(pwd)

## get the full path of this script (readlink for Linux, greadlink for Mac with coreutils installed)
sfp=$(readlink -f "${BASH_SOURCE[0]}" 2>/dev/null || greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null)

## fallback for Macs without coreutils - may cause problems if symbolic links are encountered
if [ -z "$sfp" ]; then sfp=${BASH_SOURCE[0]}; fi

## change directory to the Firefox profile directory
cd "$(dirname "${sfp}")"

echo -e "Updating userContent.css and userChrome.css for Firefox profile:\n$(pwd)"

if [ -e chrome/userContent.css ]; then
  echo -e "Your current userContent.css file for this profile will be backed up\nand the latest ShadowFox version from github will take its place."
else
  echo -e "A userContent.css file does not exist in this profile.\nIf you continue, the latest ShadowFox version from github will be downloaded."
fi

if [ -e chrome/userChrome.css ]; then
  echo -e "Your current userChrome.css file for this profile will be backed up\nand the latest ShadowFox version from github will take its place."
else
  echo -e "A userChrome.css file does not exist in this profile.\nIf you continue, the latest ShadowFox version from github will be downloaded."
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
  echo -e "Downloading latest ShadowFox userChrome.css file..."
  curl -O ${userChrome} && echo "ShadowFox userChrome.css has been downloaded."

  # download latest ShadowFox userContent.css
  echo -e "Downloading latest ShadowFox userContent.css file..."
  curl -O ${userContent} && echo "ShadowFox userContent.css has been downloaded."

  if [ -s ./ShadowFox_customization/internal_UUIDs.txt ]; then
    ## Insert any UUIDs defined in internal_UUIDs.txt into userContent.css
    while IFS='' read -r line || [[ -n "$line" ]]; do
        IFS='=' read -r -a array <<< "$line"
        sed -i "s/${array[0]}/${array[1]}/" "userContent.css"
    done < "./ShadowFox_customization/internal_UUIDs.txt"
    echo -e "Your internal UUIDs have been inserted."
  else
    echo -e "You have not defined any internal UUIDs for webextensions."
    echo -e "If you choose not to do so, webextensions will not be styled with a dark theme and may have compatibility issues in about:addons."
    echo -e "For more information, see here:"
    echo -e "https://github.com/overdodactyl/ShadowFox/wiki/Altering-webextensions"
  fi

  if [ -s ./ShadowFox_customization/colorOverrides.css ]; then
    ## Delete everything inbetween override markers
    sed -i '/--start-indicator-for-updater-scripts: black;/,/--end-indicator-for-updater-scripts: black;/{//!d;}' userContent.css
    sed -i '/--end-indicator-for-updater-scripts: black;/,/--end-indicator-for-updater-scripts: black;/{//!d;}' userChrome.css

    ## Insert everything from colorOverrides.css
    sed -i '/--start-indicator-for-updater-scripts: black;/ r ./ShadowFox_customization/colorOverrides.css' userContent.css
    sed -i '/--end-indicator-for-updater-scripts: black;/ r ./ShadowFox_customization/colorOverrides.css' userChrome.css


    echo -e "Your custom colors have been set."
  else
    echo -e "You are using the default colors set by ShadowFox."
    echo -e "You can customize the colors used by editing colorOverrides.css."
  fi

  if [ -s ./ShadowFox_customization/userContent_customization.css ]; then
    ## Append tweaks to the end of userContent.css
    cat ./ShadowFox_customization/userContent_customization.css >> userContent.css
    echo -e "Your custom userContent.css tweaks have been applied."
  else
    echo -e "You do not have any custom userContent.css tweaks."
    echo -e "You can customize userContent.css using userContent_customization.css."
  fi

  if [ -s ./ShadowFox_customization/userChrome_customization.css ]; then
    ## Append tweaks to the end of userContent.css
    cat ./ShadowFox_customization/userChrome_customization.css >> userChrome.css
    echo -e "Your custom userChrome.css tweaks have been applied."
  else
    echo -e "You do not have any custom userChrome.css tweaks."
    echo -e "You can customize userChrome.css using userChrome_customization.css."
  fi

else
  echo -e "Process aborted"
fi


## change directory back to the original working directory
cd "${currdir}"
