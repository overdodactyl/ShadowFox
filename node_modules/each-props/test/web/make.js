'use strict';

var fs = require('fs');
var path = require('path');

var opts = { encoding: 'utf-8' }

function make(filename) {
  fs.readFile(path.join(__dirname, '..', filename), opts, function(err, data) {
    throwIfError(err);
    data = data.replace(/[^\r\n]*require[^\r|\n]*/g, '');
    fs.writeFile(path.join(__dirname, filename), data, opts, throwIfError);
  });
}
  
function throwIfError(err) {
  if (err) {
    throw err;
  }
}

make('each-props-args.js')
make('each-props-proc.js')
