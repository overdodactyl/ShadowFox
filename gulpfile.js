'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

/**********************************
*								                  *
*		userContent.css			          *
*								                  *
**********************************/

/* userContent file with no addons */
gulp.task('userContent_no_addons', function() {
  return gulp.src(['color_variables.css', 'userContent-files/all_about_pages.css', 'userContent-files/webpages/*.css', 'userContent-files/about_pages/*.css'])
    .pipe(concatCss('userContent_no_addons.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userContent */
gulp.task('userContent_all', ['userContent_no_addons'], function() {
  return gulp.src(['color_variables.css', 'userContent-files/all_about_pages.css', 'userContent-files/*/*.css'])
    .pipe(concatCss('userContent.css'))
    .pipe(gulp.dest('.'));
});


/**********************************
*								                  *
*		userChrome.css			          *
*								                  *
**********************************/

/* Add everything to userContent */
gulp.task('userChrome_windows', function() {
  return gulp.src(['color_variables.css', 'userChrome-files/*.css', 'userChrome-files/windows_fixes/*.css' ])
    .pipe(concatCss('userChrome_windows.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userContent */
gulp.task('userChrome_all', [`userChrome_windows`], function() {
  return gulp.src(['color_variables.css', 'userChrome-files/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});

/* Remove White Flash and Bookmarks Border  */
gulp.task('userChrome_basic', function() {
  return gulp.src(['userChrome-files/remove_white_flash.css', 'userChrome-files/remove_bookmarks_bottom_border.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});
