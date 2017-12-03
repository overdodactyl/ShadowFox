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
