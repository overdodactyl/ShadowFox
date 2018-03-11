#!/usr/local/bin/bash

### UUID finder for Mac
## author: @overdodactyl
## version: 1.0

declare -A styled=( ["brief@mozdev.org"]="brief"
                    ["CookieAutoDelete@kennydo.com"]="cookie_autodelete"
                    ["{174b2d58-b983-4501-ab4b-07e71203cb43}"]="dark_mode"
                    ["jid1-BoFifL9Vbdl2zQ@jetpack"]="decentraleyes"
                    ["@testpilot-containers"]="multi_account_containers"
                    ["https-everywhere@eff.org"]="https_everywhere"
                    ["multipletab@piro.sakura.ne.jp"]="multiple_tab_handler"
                    ["neaturl@hugsmile.eu"]="neat_url"
                    ["{73a6fe31-595d-460b-a920-fcc0f8843232}"]="noscript"
                    ["{1b1e6108-2d88-4f0f-a338-01f9dbcccd6f}"]="request_control"
                    ["skipredirect@sblask"]="skip_redirect"
                    ["{b3e677f4-1150-4387-8629-da738260a48e}"]="smart_https"
                    ["{e225ac78-5e83-484b-a16b-b6ed0924212f}"]="tab_suspender"
                    ["treestyletab@piro.sakura.ne.jp"]="tree_style_tab"
                    ["tridactyl.vim@cmcaine.co.uk"]="tridactyl"
                    ["uBlock0@raymondhill.net"]="ublock_origin"
                    ["uBO-Scope@raymondhill.net"]="ubo_scope"
                    ["uMatrix@raymondhill.net"]="umatrix"
                    ["vim-vixen@i-beam.org"]="vim_vixen"
                  )

line=$(sed -n -e 's/^user_pref("extensions.webextensions.uuids", "{\(.*\).*}");/\1/p' ../prefs.js)

## Remove prefix and suffix
prefix='user_pref("extensions.webextensions.uuids", "{'
suffix='}");'
line=${line#$prefix}
line=${line%$suffix}
prefix='\\"'
suffix='\\"'

IFS=',' read -ra EXTS <<< "$line"
for i in "${EXTS[@]}"; do
    id=$(echo $i | sed -n 's/.*"\(.*\)\\":.*/\1/p')
    uuid=$(echo $i | sed -n 's/.*"\(.*\)\\".*/\1/p')
    if test "${styled[$id]+isset}"
    then
        echo "${styled[$id]}_UUID=$uuid" >> 'ShadowFox_customization/internal_UUIDs.txt'
    fi;
done
