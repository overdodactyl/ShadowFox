window.jQuery = window.$ = require("jquery");
var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript.js');

// Insert content into second iframe
var doc = document.getElementById('iframe_content').contentWindow.document;
doc.open();
doc.write('Hello World');
doc.close();

// Codemirror
var code = $('.codemirror-textarea')[0];
var iframes_test = CodeMirror.fromTextArea(code, {
  lineNumbers: true,
  mode: "javascript",
  theme: "shadowfox",
  readOnly: true
});