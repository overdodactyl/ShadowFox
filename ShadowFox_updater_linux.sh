#!/bin/bash

### ShadowFox updater for Mac/Linux
## author: @overdodactyl
## version: 1.0

userChrome="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userChrome.css"
userContent="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/userContent.css"

echo -e "\nThis script should be run from your inside your Firefox profile.\n"

currdir=$(pwd)

## get the full path of this script (readlink for Linux, greadlink for Mac with coreutils installed)
sfp=$(readlink -f "${BASH_SOURCE[0]}" 2>/dev/null || greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null)

## fallback for Macs without coreutils
if [ -z "$sfp" ]; then sfp=${BASH_SOURCE[0]}; fi

## change directory to the Firefox profile directory
cd "$(dirname "${sfp}")"

## Make chrome directory if it doesn't exist
mkdir -p chrome;

## Move to chrome directory
cd chrome;

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
  if [ -e userChrome.css ]; then
    # backup current userChrome.css file
    bakfile="userChrome.backup.$(date +"%Y-%m-%d_%H%M")"
    mv userChrome.css "${bakfile}" && echo "Your previous userChrome.css file was backed up: ${bakfile}"
  fi
  if [ -e userContent.css ]; then
    # backup current userChrome.css file
    bakfile="userContent.backup.$(date +"%Y-%m-%d_%H%M")"
    mv userContent.css "${bakfile}" && echo "Your previous userContent.css file was backed up: ${bakfile}"
  fi

  # download latest ShadowFox userChrome.css
  echo -e "\ndownloading latest ShadowFox userChrome.css file\n"
  curl -O ${userChrome} && echo "ShadowFox userChrome.css has been downloaded"

  # download latest ShadowFox userContent.css
  echo -e "\ndownloading latest ShadowFox userContent.css file\n"
  curl -O ${userContent} && echo "ShadowFox userContent.css has been downloaded"

else
  echo -e "\nProcess aborted\n"
fi


## change any color variables here
PRIMARY_ACCENT_COLOR="#279f27"
PRIMARY_ACCENT_COLOR_DARK="#228b22"
PRIMARY_ACCENT_COLOR_DARKEST="#006100"

sed -i "s/--primary-accent-color: var(--blue-40);/--primary-accent-color: $PRIMARY_ACCENT_COLOR;/" "userChrome.css"
sed -i "s/--primary-accent-color: var(--blue-40);/--primary-accent-color: $PRIMARY_ACCENT_COLOR;/" "userContent.css"

sed -i "s/--primary-accent-color-dark: var(--blue-50);/--primary-accent-color-dark: $PRIMARY_ACCENT_COLOR_DARK;/" "userChrome.css"
sed -i "s/--primary-accent-color-dark: var(--blue-50);/--primary-accent-color-dark: $PRIMARY_ACCENT_COLOR_DARK;/" "userContent.css"

sed -i "s/--primary-accent-color-darkest: var(--blue-60);/--primary-accent-color-darkest: $PRIMARY_ACCENT_COLOR_DARKEST;/" "userChrome.css"
sed -i "s/--primary-accent-color-darkest: var(--blue-60);/--primary-accent-color-darkest: $PRIMARY_ACCENT_COLOR_DARKEST;/" "userContent.css"


## change any webextension Internal UUIDs here.
## one example is provided

## Define Internal UUID's for extensions here
uMATRIX_INTERNAL_UUID="32818407-cb70-5d40-9f8d-81ed9f2012a6"

## Replace Ineternal UUID placeholders with variables defined above
sed -i "s/9eba7fab-892c-7b42-a57e-b876d4196d70/$uMATRIX_INTERNAL_UUID/" "userContent.css"



## change directory back to the original working directory
cd "${currdir}"
