gulp-exec ![status](https://secure.travis-ci.org/robrich/gulp-exec.png?branch=master)
===========

[exec](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) plugin for [gulp](https://github.com/gulpjs/gulp)

Usage
-----

```javascript
var exec = require('gulp-exec');

gulp.task('reset', function() {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to gutil.template()
  };
  var reportOptions = {
  	err: true, // default = true, false means don't write err
  	stderr: true, // default = true, false means don't write stderr
  	stdout: true // default = true, false means don't write stdout
  }
  return gulp.src('./**/**')
    .pipe(exec('git checkout <%= file.path %> <%= options.customTemplatingThing %>', options))
    .pipe(exec.reporter(reportOptions));
});
```

**Note**: If you just want to run a command, just run the command, don't use this plugin:

```js
var exec = require('child_process').exec;

gulp.task('task', function (cb) {
  exec('ping localhost', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
```

~~`gulp.src('.')`~~ does bad things.  Don't do it.

**Note**: running and reporting are now separate, a breaking change from previous versions.

LICENSE
-------

(MIT License)

Copyright (c) 2014 [Richardson & Sons, LLC](http://richardsonandsons.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
