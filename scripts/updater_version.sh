#!/bin/bash

new_version=$1

# Substitute version number
current_ver="$(sed 's/[-<!CURR_VER:> ]//g' <<< $(sed -n '/CURR_VER/p' website/index.html))"
sed -i -e "s/$current_ver/$new_version/g" website/index.html

# Build website and push to GitHub
parcel build website/index.html -d website/dist --public-url ./
git add website/*
git commit -m "website: change updater version number"
git push
git subtree push --prefix website/dist origin gh-pages