#!/usr/bin/env bash

### UUID finder for Mac
## author: @overdodactyl
## version: 1.1

## Get current mappings from online repo
webextension_mappings="https://raw.githubusercontent.com/overdodactyl/ShadowFox/master/scripts/webextension_mappings.txt"
web_ex=$(curl -s ${webextension_mappings})

## declare directory
declare -A styled=()

## Generate dictionaries from file
while IFS="|" read -r webex_name webex_id; do
    styled["$webex_id"]+="$webex_name"
done <"webextensions.txt"

## Get installed extesnsions from prefs.js
line=$(sed -n -e 's/^user_pref("extensions.webextensions.uuids", "{\(.*\).*}");/\1/p' ../prefs.js)

## Write to internal_UUIDs
IFS=',' read -ra EXTS <<< "$line"
for i in "${EXTS[@]}"; do
    id=$(echo $i | sed -n 's/.*"\(.*\)\\":.*/\1/p')
    uuid=$(echo $i | sed -n 's/.*"\(.*\)\\".*/\1/p')
    if [[ -n "${styled[$id]}" ]]
    then
      echo "${styled[$id]}_UUID=$uuid" >> 'ShadowFox_customization/internal_UUIDs.txt'
    fi;
done
