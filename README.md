## What do the changes look like?

Here are just a few examples:

Context Menus and Sidebar                   | `about:` pages
:------------------------------------------:| :------------------------------------------:                                         
![dark_menus](Screenshots/contextmenus.png) | ![dark_menus](Screenshots/preferences.png)

`view-source:` pages                        | Mozilla Addon Store
:------------------------------------------:| :------------------------------------------:                                         
![dark_menus](Screenshots/viewsource.png)   | ![dark_menus](Screenshots/addons.png)


# New changelog created

To stay up-to-date with all changes made to this repository, please see [here](changelog.md).

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
 


