# No Empty iframes

## Test Page

[Test page](https://overdodactyl.github.io/ShadowFox/no_empty_iframes_testpage)

## What it does

No Empty iframes adds a blank `div` to any iframes that have an empty `body`.

## That sounds useless...what's the point?

[ShadowFox](https://github.com/overdodactyl/ShadowFox) utilizes `userContent.css` and `userChrome.css` to create a universal dark theme for Firefox.  In part, this means styling `about:blank`.  A complication of this is that `about:blank` is also used for anonymous frames on webpages.  Generally, iframes will contain content, making the following css rule specific enough:

```css
html > body:empty {
	background-color: var(--in-content-page-background)!important;
	margin: 0!important
}
```

Some pages, however, have empty iframes that cause readability issues (see [#222](https://github.com/overdodactyl/ShadowFox/issues/222)). 

This extension injects an empty div into such iframes, allowing the rule above to work.

## Better approaches?

If anyone has a better approach/workaround for this problem, I would appreciate any suggestions.  