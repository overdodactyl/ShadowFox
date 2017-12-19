## 12/19/2017 00:06 UTC

* Added support for `manifest.json` pages.

* Updated README.md

* Added a wiki entry: [ShadowFox is incompatible with the preferences page of one of on my addons](https://github.com/overdodactyl/ShadowFox/wiki/ShadowFox-is-incompatible-with-the-preferences-page-of-one-of-on-my-addons)




## 12/18/2017 21:03 UTC

I've neglected to update the changelog for quite some time, so I'm going to try and just hit the major changes here:

* Added support for the following things

	* Library
	
	* Addon store (addons.mozilla.org)
	
	* About Firefox Dialog

	* `view-source` pages
	
	* `about:healthreport`
	
	* `about:serviceworkers`
		
* Changed the main accent color to blue

* Fixes/improvements:

	* Onboarding overlay accessible through the newtab/home page
	
	* Fix to prevent styling from overriding `about:reader`
	
	* Top site edit page/dialog boxes (newtab/home)

* Webextensions

	* Dark context menus for Tree Style Tabs


## 12/5/2017 5:49 UTC

* Changes to the address bar/search bar

	* Added support for the search bar
	
	* Changed the border color when in focus (from blue to the default accent color used in this repository)
	
	* Increased the contrast found when hovering over an item in the search dropdown

* Sidebar

	* Changed the outline color of icons from black to light gray
	
	* Changed the width and color of the sidebar separator.
	
* Downloads drop down menu from the nav bar

	* Altered colors to for consistency 
	
* Added support for the "New Update Available" pop-up

* Windows specific fixes

	* Increased spacing in context menus
	
	* Removed white line between icons and entries
	
	* Removed menu separators 
	
* Extensions

	* Fixed an issue that caused some extension drop downs to adapt the dark them and become unreadable 
	
	* Inverted the color of the Tree Style Tabs logo in the sidebar drop down 

**Huge thanks to u/markdarkness for all the helpful suggestions, opinions, caught bugs, and code contributions for Windows specific problems**

## 12/4/2017 3:23 UTC

* Added `secure_connection_colors.css`, which changes the secure connection color (green), to the default primary accent color used in this repository.


## 12/3/2017  21:43 UTC

* Fixed the secure connection sub menu that was not styled - issue #8 (thanks 
@chinook77 for bringing this to my attention)

* Added dark scroll bars to the side bar (thanks u/\_Dimitri\_ for the code) - this section is optional and may be uncommented based on your OS or preferences.


## 12/3/2017 7:58 UTC

* Improvements to `about:newtab` and `about:home`

	* Support for the preferences page
	
	* Search bar
	
* Improvements to the sidebar

	* Replaced harsh black lines with light gray ones

## 12/3/2017 5:18 UTC

* Fixed the download drop down menu from the nav bar that still had a white background 

* Made the separators between one-off search engines lighter to help stand out

* First draft at a dark sidebar (Windows users - if this doesn't work for you, please let me know and I'll upload a separate file)

* Reversed the icon color of Tree Style Tabs to dark gray to match theme

## 12/2/2017 22:50 UTC

* Improved the design of the address bar drop down

* Added support for `about:neterror`

* Added support for the "Problem Loading Page" page

* Made improvements to `about:newtab` and `about:home`

* Changed the color of status panels (small pop-ups that show links/loading links) to adhere to the dark theme 

* Changed the the color of the "Done" button on the customize page

* Fixed the context menu for bookmark submenus in Windows (thanks u/mrkwatz)


## 11/30/2017 - UTC 5:10

* Made some fixes to context and drop down menus that lacked conformity 

* Added `remove_bookmarks_bottom_border.css` to remove 1px black border between the bookmarks toolbar and the webpage.

Huge thanks to u/markdarkness for pointing these out


## 11/30/2017

* Added userChrome.css and accompanying files to include support for:

	* Dark menus from the nav-bar
	
	* Dark context menus
	
	* Remove the white flash when opening new pages

* Several modifications to `about:addons`, including:

	* Making the background of extension icons transparent to avoid white squares
	
	* Dark context menus 
	
	* Several visual tweaks to better adhere to the overall theme
	
* Added `color_variables.css`.  While not yet used, this will eventually be used as the basis for all color schemes to adhere to the Firefox Photon UI.  

* Added `changelog.md` to create an easy way for users to keep up-to-date with changes.  

## 11/29/2017

* Several visual modifications to `about:addons`.  Most importantly, fixed an issue causing addon descriptions to be unreadable on a dark background.
	
* Added a new directory titled `webextension-tweaks`.  This folder will include css files to improve visual compatibility for webextensions that utilize `about:addons` for preferences.  

	* Added support for Tree Style Tabs
	
	* Added support for Stylus
