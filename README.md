# What is ShadowFox?

ShadowFox is a collection of `userChrome.css` and `userContent.css` tweaks to supplement and expand the dark theme provided by Mozilla.

# What modifications does ShadowFox make?

All modifications can be split into two categories: (1) Changes to the user interface (`userChrome.css`) and (2) Changes to webpages (`userContent.css`).

## userChrome tweaks

Modification to the following items have been made to match the Firefox dark theme:

* Sidebar
* Library
* Smart bar and search bar drop downs
* Context menus
* Menus accesssed from the nav bar
* Customization page
* Tab line and secure connection icon
* About Firefox dialog box
* Status panels
* Remove white flash on page load
* Findbar

## userContent tweaks

#### about: pages

All `about:` pages have been styled (e.g. `about:addons`, `about:preferences`, `about:config`, `about:profiles` etc.)

#### Webpages

The following webpages have been styled to match the dark theme:

* addons.mozilla.org
* `view-source` pages
* manifest.json pages
* Dierectory listing pages (`file:///`)
* `https://raw.githubusercontent.com/...`

#### Webextension Tweaks

Tweaks for the following webextensions have been made:

* Cookie AutoDelete
* Dark Mode
* Decentraleyes
* HTTPSEverywhere
* Multi-Account Containers
* Multiple Tabs Handler
* NoScript
* Request Control
* Skip Redirect
* Smart HTTPS
* Tab Suspender (memory saver)
* Tree Style Tab
* uBlockOrigin
* uBO-Scope
* uMatrix

#### Webextension tweaks that go directly into the webextension settings page (custom css)

These tweaks are found in the directory `./webextension`

* Tree Style Tab
* Violentmonkey

#### Webextension tweaks hosted on userstyles.org

* [Stylus](https://userstyles.org/styles/153739/stylus-dark-shadowfox)


# What do the changes look like?

Here are just a few examples:

Context Menus and Sidebar                   | `about:` pages
:------------------------------------------:| :------------------------------------------:                                         
![dark_menus](Screenshots/contextmenus.png) | ![dark_menus](Screenshots/preferences.png)

`view-source:` pages                        | Mozilla Addon Store
:------------------------------------------:| :------------------------------------------:                                         
![dark_menus](Screenshots/viewsource.png)   | ![dark_menus](Screenshots/addons.png)


# How do I install/modify ShadowFox

Please see [here](https://github.com/overdodactyl/ShadowFox/wiki).

# Keeping up-to-date with Changes

To help stay notified of all the changes made to this repository, please see the [changelog](changelog.md).

# Looking for more information or experiencing problems?

Please take a look through the [wiki](https://github.com/overdodactyl/ShadowFox/wiki) and [Issues](https://github.com/overdodactyl/ShadowFox/issues?q=is%3Aopen) (both open and closed).  If you can't find what you need, don't hesitate to open up a new issue.  

# Have a feature request?

Please read through the current issues and search old ones.  If it doesn't already exist, feel free to ask!

# Contributing

I welcome any contributions and would be excited to have a team of people helping with this project.  If you are uncomfortable making pull requests, you can simply open up an issue and attach any code you would like included.
