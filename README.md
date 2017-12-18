# What is ShadowFox?

ShadowFox is a collection of `userChrome.css` and `userContent.css` tweaks to supplement and expand the dark theme provided by Mozilla. 

# What modifications does ShadowFox make?

All modifications can be split into two categories: (1) Changes to the user interface (`userChrome.css`) and (2) Changes to webpages (`userContent.css`).

## userChrome tweaks

Modification to the following items have been made to match the Firefox dark theme:

* Sidebar
* Libray
* Smart bar and search bar drop downs
* Context menus 
* Menus accesssed from the nav bar
* Customization page
* Tab line and secure connection icon colors
* About Firefox Dialog Box
* Status panels
* Remove white flash on page load

## userContent tweaks

#### about: pages

All `about:` pages have been styled (e.g. `about:addons`, `about:preferences`, `about:config`, `about:profiles` etc.

#### Webpages

The following webpages have been styled to match the dark theme:

* addons.mozilla.org
* `view-source` pages
* manifest.json pages

#### Webextension Tweaks

Tweaks for the following webextensions have been made:

* Tree Style Tabs - preferences page and context menus
* Stylus - preferences page
* Multiple Tabs Handler - preferences page
* Dark Mode - preferences page


# What do the changes look like?

Here are just a few examples:

Context Menus and Sidebar                   | `about:` pages
:------------------------------------------:| :------------------------------------------:                                         
![dark_menus](Screenshots/contextmenus.png) | ![dark_menus](Screenshots/preferences.png)

`view-source:` pages                        | Mozilla Addon Store
:------------------------------------------:| :------------------------------------------:                                         
![dark_menus](Screenshots/viewsource.png)   | ![dark_menus](Screenshots/addons.png)


# Keeping up-to-date with Changes

To help stay notified of all the changes made to this repository, please see [here](changelog.md).

# Important Update 11/29/2017 

Some extensions have preferences built into the `about:addon` page that do not utilize the default styling settings utilized by Firefox.  

Due to this, some compatibility issues may arise (such as Tree Style Tabs), or simply undesirable/ugly appearances (such as Stylus). 

Current workaround:

Additional code is being written to resolve this.  Since not all users use the same extensions, the code will not be placed in the main userContent.css file.  Instead, they will be placed in individual files - one file per extension - in the webextension-tweaks folder.  To use these files, do the following:

* Download the corresponding css file of interest, and put it in a folder titled `webextension-tweaks` within your chrome directory

* Go to `about:debugging#addons` and find the corresponding addon.  

* Copy the Internal UUID of the extension

* Replace the ID in the css file you downloaded with this ID

* In your userContent.css file, add an import statement at the top of the file. For example, `@import "webextension-tweaks/tree_style_tabs.css";` 

* Save all your files and restart your browser.  
 


