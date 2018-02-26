#!/bin/bash

## Mac
## adds UUIDs found in internal_UUIDs.txt to their corresponding file in userContent-files/webextension-tweaks
## designed for users using userContent_imports.css
## entries in internal_UUIDs.txt should take on the following format:  webextension_name_UUID=INTERNAL_UUID
## author: @overdodactyl
## version: 1.0

currdir=$(pwd)

## get the full path of this script (readlink for Linux, greadlink for Mac with coreutils installed)
sfp=$(readlink -f "${BASH_SOURCE[0]}" 2>/dev/null || greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null)

## fallback for Macs without coreutils - may cause problems if symbolic links are encountered
if [ -z "$sfp" ]; then sfp=${BASH_SOURCE[0]}; fi

## change directory to the Firefox profile directory
cd "$(dirname "${sfp}")"

## Insert any UUIDs defined in internal_UUIDs.txt into userContent.css
while IFS='' read -r line || [[ -n "$line" ]]; do
    IFS='=' read -r -a array <<< "$line"
    webextension_name=${array[0]%_UUID}
    sed -i '' "s/${array[0]}/${array[1]}/" "userContent-files/webextension-tweaks/${webextension_name}.css"
done < "internal_UUIDs.txt"
