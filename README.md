# userContent-tweaks

Currently, the scope of this project involves improving `about` pages for Firefox 57+ users who prefer a dark theme.  Depending on available time and user contributions, this repository could evolve into a centralized location for all userContent.css tweaks.  

## What is userContent.css?

In short, userContent.css is a file used to define and customize web page content.  This file does not exist in a Firefox profile by default, and must be created by the user.

## Why userContent.css?

Firefox has restrictions on the pages extensions can access.  Therefore, something such as Stylus can not be used to stlye `about` pages.  

#### Where does the userContent.css file go?

Like userChrome.css, userContent.css resides in a subdirectoy titled `chrome` within your Firefox profile.  

#### How do I get to my profile directory?

The location of your profile depends on your operating system.  Nevertheless, the following steps should always work:

* Use the address bar to visit `about:support`

* Click on the Show in Finder/Show Folder button available next to the label `Profile Finder`.

#### I'm in my profile directory, what now?

Look for a folder titled `chrome`.  This folder does not exist by default, so if you don't see it, create it yourself.  

You can now download the zip file of this repository, and put the userContent.css file in your `chrome` folder.  

*_IMPORTANT_: if you already have a userContent.css file, combine the contents of the two files as to not lose any changes you have made.   

## What do the changes look like?

Here are just a few examples:

![about:preferences](Screenshots/about_preferences.png)

![about:config](Screenshots/about_config.png)

![about:addons](Screenshots/about_addons.png)

![about:privatebrowsing](Screenshots/about_privatebrowsing.png)

![about:sessionrestore](Screenshots/about_sessionrestore.png)

# Can I contribute?

Of course! Ideally, I would like this repository to be driven by user contributions.  There are a large number of `about` pages, and I have just scratched the surface (to see them all, visit `about:about`).  I would love to have your help completeing the rest. This project is truly in it's infancy, so please feel free to make suggestions, tell me where I've made mistakes, and let me know how you would like this repository to be shaped.

I'm open to anything, so if you would like to contribute in any way, please let me know. I don't want to limit this repository to only changes in `about` pages...that's just what I began working on.  You can submit pull requests, or message me on Reddit if you have something you want to discuss/share :)

Edit: Due to some very helpful tips and suggestions, I was able to complete the rest of the `about:pages` (I think?)...so I no longer need help with that...yay!

I would still love your help finding areas to improve, things I messed, ways to improve the code etc.~

### [ToDo]

Condense code where possible

Create variable so users can easily change the theme

