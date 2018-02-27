[each-props][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage Status][coverage-img]][coverage-url]
============

Process object properties deeply.

Install
-------

```
$ npm i each-props --save
```

Usage
-----

* Load this module :

    ```js
    const eachProps = require('each-props');
    ```

* Apply a function to all (non plain object) properties.

    ```js
    var obj = { a: 1, b: { c: 'CCC', d: { e: 'EEE' } } };

    eachProps(obj, function(value, keyChain, nodeInfo) {
      if (keyChain === 'a') {
        nodeInfo.parent['a'] = value * 2;
      } else if (keyChain === 'b.c') {
        nodeInfo.parent['c'] = value.toLowerCase();
      } else if (keyChain === 'b.d') {
        return true; // stop to dig
      } else if (keyChain === 'b.d.e') {
        nodeInfo.parent['e'] = value.toLowerCase();
      }
    });
    console.log(obj);
    // => { a: 2, b: { c: 'ccc', d: { e: 'EEE' } } };
    ```

API
---

### eachProps(obj, callback [, opts]) => void

Executes the *callback* function for all properties.

##### **Arguments :** 

   * **obj** [object] : A plain object to be treated.
   * **fn** [function] : A function to treat the plain object.
   * **opts** [object] : An object to be able to has options.

##### **API of *fn* function**

* ***fn(value, keyChain, nodeInfo) => boolean***

    * **Arguments :**
        * **value** [any] : The property value.
        * **keyChain** [string] : A string concatenating the hierarchical keys with dots.
        * **nodeInfo** [object] : An object which contains properties: `name`, `index`, `count`, `depth`, `parent`, `sort`, and can contains more properties by specifying in `opts` above. 

    * **Returns :** [boolean] : Stops digging child properties if `true`.

##### **Properties of *nodeInfo* :**

* ***nodeInfo*** *[object]*
    * **name** [string] : The property name of this node.
    * **index** [number] : The index of the property among the sibling properties.
    * **count** [number] : The count of the sibling properties.
    * **depth** [number] : The depth in the property hierarchy.
    * **parent** [object] : The parent property.
    * **sort** [function] : A sort function which orders the child properties. This property is inherited from **opts**, if specified.
    * ... and any properties inherited from **opts**.

##### **Properties of *opts* :**

* ***opts*** *[object]*
    * **sort** [function] : A sort function which orders the same level properties. (optional)
    * ... and any properties you want to pass to each node.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/sttk/each-props/
[npm-img]: https://img.shields.io/badge/npm-v1.3.1-blue.svg
[npm-url]: https://www.npmjs.org/package/each-props/
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses.MIT
[travis-img]: https://travis-ci.org/sttk/each-props.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/each-props
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/each-props?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/each-props
[coverage-img]: https://coveralls.io/repos/github/sttk/each-props/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/each-props?branch=master

