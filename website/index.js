window.jQuery = window.$ = require("jquery");
require('waypoints/lib/jquery.waypoints');
require('lazysizes');
var CodeMirror = require('codemirror');
require('codemirror/mode/css/css');
require('magnific-popup');
require('html5shiv');

// import images for lazy Loading
// Work-around until https://www.npmjs.com/package/parcel-plugin-lazy is functional
//import imageURL from '/resources/img/Addons-small.jpg';


// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

var waypoint = new window.Waypoint({
  element: document.getElementsByClassName('js--section-features'),
  handler: function(direction) {
    if (direction == "down") {
      $('nav').addClass('sticky');
    } else {
      $('nav').removeClass('sticky');
    }
  },
  offset: '60px'
})

var waypoint = new window.Waypoint({
  element: document.getElementsByClassName('js--wp-1'),
  handler: function(direction) {
    $('.js--wp-1').addClass('animated fadeIn');
  },
  offset: '50%'
})

var waypoint = new window.Waypoint({
  element: document.getElementsByClassName('js--wp-4'),
  handler: function(direction) {
    $('.js--wp-4').addClass('animated pulse');
  },
  offset: '50%'
})

/* Scroll on buttons */
$('.js--scroll-to-plans').click(function() {
  $('html, body').animate({
    scrollTop: $('.js--section-plans').offset().top
  }, 1000);
});

$('.js--scroll-to-start').click(function() {
  $('html, body').animate({
    scrollTop: $('.js--section-features').offset().top
  }, 1000);
});


/* Navigation scroll */
$(function() {
  $('a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

/* Mobile navigation */
$('.js--nav-icon, .js--main-nav a, .logo-black').click(function(element){
  var nav = $('.js--main-nav');
  var icon = $('.js--nav-icon i');

  //Gets the class name of the element that triggered the event
  var clicked = element.target.className;

  //Exists the function if the menu is closed AND the logo-black element (logo image) was clicked
  if (icon.hasClass('ion-navicon-round') && clicked == 'logo-black')
     return;

  //Opens and closes the menu
  if ($(window).width() < 768){
     nav.slideToggle(200);
  }

  //Changes icon states of the menu button
  if (icon.hasClass('ion-navicon-round')) {
     icon.addClass('ion-close-round');
     icon.removeClass('ion-navicon-round');
  } else {
     icon.addClass('ion-navicon-round');
     icon.removeClass('ion-close-round');
  }
});

$(window).resize(function(){
  var nav = $('.js--main-nav');
  var icon = $('.js--nav-icon i');

  if ($(window).width() > 767){
     nav.css("display", "block");
     icon.addClass('ion-close-round');
     icon.removeClass('ion-navicon-round');
  } else {
     nav.css("display", "none");
     icon.addClass('ion-navicon-round');
     icon.removeClass('ion-close-round');
  }
});


/* Arrow Flip */
function switchArrow(arrow) {
  var icon = $(arrow);
  if (icon.hasClass('ion-ios-arrow-right')) {
    icon.addClass('ion-ios-arrow-down');
    icon.removeClass('ion-ios-arrow-right');
  } else {
    icon.addClass('ion-ios-arrow-right');
    icon.removeClass('ion-ios-arrow-down');
  }
}

$('.js--arrow-icon-1').click(function() {
  switchArrow('.js--arrow-icon-1 i');
});
$('.js--arrow-icon-2').click(function() {
  switchArrow('.js--arrow-icon-2 i');
});
$('.js--arrow-icon-3').click(function() {
  switchArrow('.js--arrow-icon-3 i');
});
$('.js--arrow-icon-4').click(function() {
  switchArrow('.js--arrow-icon-4 i');
});
$('.js--arrow-icon-5').click(function() {
  switchArrow('.js--arrow-icon-5 i');
});


var code = $('.codemirror-textarea')[0];
var editor_1 = CodeMirror.fromTextArea(code, {
  lineNumbers: true,
  mode: "css",
  theme: "shadowfox"
});

var code = $('.codemirror-textarea')[1];
var readOnlyColors = CodeMirror.fromTextArea(code, {
  lineNumbers: true,
  mode: "css",
  theme: "shadowfox",
  readOnly: true
});

$(document).on('click', '.btn-insert-text', function() {
  var uct = "/* GPL-3.9 Copyright (C) 2007 Timvde/UserChrome-Tweaks; Code pulled from https://github.com/Timvde/UserChrome-Tweaks */"
  var dict = {
    '#roundedTabs': ["https://raw.githubusercontent.com/wilfredwee/photon-australis/master/userChrome-dark.css", "/* MIT Copyright (c) 2017 Wilfred Wee; Code pulled from https://raw.githubusercontent.com/wilfredwee/photon-australis/master/userChrome-dark.css */"],
    '#hideSidebar': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/sidebar/auto-hide-sidebar.css", uct],
    '#bookmarksNewTab': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/toolbars/show-bookmarks-only-on-newtab.css", uct],
    '#closeHover': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/tabs/close-button-hover.css", uct],
    '#greyscaleFavicons': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/tabs/grayscale-favicon.css", uct],
    '#hideFavicons': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/tabs/hide-favicons.css", uct],
    '#bottomMacos': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/tabs/tabs-on-bottom-macOS.css", uct],
    '#leftClose': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/tabs/x-on-left.css", uct],
    '#autoHide': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/toolbars/auto-hide.css", uct],
    '#slidingBookmarks': ["https://raw.githubusercontent.com/Timvde/UserChrome-Tweaks/master/toolbars/sliding-bookmarks-bar.css", uct]
  }

  for (var key in dict) {
    if ($(key).prop('checked') == true) {
      var url = dict[key][0];
      var licence = dict[key][1];
      insertText(licence, 1)
      readTextFile(url, 1)
    }
  }
})

function readTextFile(file, num) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        insertText(allText, num);
      }
    }
  }
  rawFile.send(null);
}

/* Get primary color */
$(document).on('click', '.insert-color', function() {
  var accent1 = document.getElementById("accent-1").value;
  var accent2 = document.getElementById("accent-2").value;
  var accent3 = document.getElementById("accent-3").value;
  var shade = document.getElementById("shade").value;
  if (accent1 != "#45a1ff") {
    insertText("--accent-1: " + accent1 + ";", 0);
  }
  if (accent2 != "#0a84ff") {
    insertText("--accent-2: " + accent2 + ";", 0);
  }
  if (accent3 != "#0060df") {
    insertText("--accent-3: " + accent3 + ";", 0);
  }
  if (shade == "darker") {
    insertText("--tone-1: var(--grey-20);", 0);
    insertText("--tone-2: var(--grey-30);", 0);
    insertText("--tone-3: var(--grey-40);", 0);
    insertText("--tone-4: var(--grey-50);", 0);
    insertText("--tone-5: var(--grey-60);", 0);
    insertText("--tone-6: var(--grey-70);", 0);
    insertText("--tone-7: var(--grey-80);", 0);
    insertText("--tone-8: var(--grey-90);", 0);
    insertText("--tone-8: #fff;", 0);
  }

})


// Begin inputting of clicked text into editor
function insertText(data, num) {
  var cm = $(".CodeMirror")[num].CodeMirror;
  var doc = cm.getDoc();
  var cursor = doc.getCursor(); // gets the line number in the cursor position
  var line = doc.getLine(cursor.line); // get the line contents
  var pos = {
    line: cursor.line
  };
  if (line.length === 0) {
    // check if the line is empty
    // add the data
    doc.replaceRange(data, pos);
  } else {
    // add a new line and the data
    doc.replaceRange("\n" + data, pos);
  }
}

/* Clear Code Editor */
$(document).on('click', '.btn-remove-text', function() {
  editor_1.getDoc().setValue('');
})

/* Clear Code Editor */
$(document).on('click', '.btn-remove-code', function() {
  readOnlyColors.getDoc().setValue('');
})

/* Clear Checkboxes */
$(document).on('click', '.clear-boxes', function() {
  $('.chrome-options input[type=checkbox]').prop('checked', false);
})

/* Reset Colors */
$(document).on('click', '.clear-colors', function() {
  document.getElementById("accent-1").value = "#45a1ff";
  document.getElementById("accent-2").value = "#0a84ff";
  document.getElementById("accent-3").value = "#0060df";
  document.getElementById("shade").value = "default";
})

// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

/* Download CSS */
$(document).on('click', '.download-css', function() {
  var data = editor_1.getValue();
  download(data, "colorOverrides.css", "css")
})

$(document).on('click', '.download-css-2', function() {
  var data = readOnlyColors.getValue();
  download(data, "userChrome_customization.css", "css")
})

var gal = document.getElementsByClassName("popup-gallery");
$(gal).magnificPopup({
  delegate: 'a',
  type: 'image',
  tLoading: 'Loading image #%curr%...',
  mainClass: 'mfp-img-mobile',
  gallery: {
    enabled: true,
    navigateByImgClick: true,
    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
  },
  image: {
    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    titleSrc: function(item) {
      return item.el.attr('title') + '<small>by Pat Johnson</small>';
    }
  }
});

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = "29000000px";
    }
  });
}
