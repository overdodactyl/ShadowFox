'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify_code', () => {
  return gulp.src(['common-files/*.css', 'userContent-files/*.css', 'userContent-files/*/*.css', 'userChrome-files/*', 'userChrome-files/*/*.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('minify_chrome', () => {
  return gulp.src(['userChrome.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('minify_content', () => {
  return gulp.src(['userContent.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('.'));
});




/**********************************
*								                  *
*		userContent.css			          *
*								                  *
**********************************/

/* userContent file with no addons */
gulp.task('userContent_no_addons', function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userContent-files/*.css'])
    .pipe(concatCss('userContent_no_addons.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userContent */
gulp.task('userContent_all', ['minify_code', 'userContent_no_addons'], function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userContent-files/*.css', 'userContent-files/*/*.css'])
    .pipe(concatCss('userContent.css'))
    .pipe(gulp.dest('.'));
});


/**********************************
*								                  *
*		userChrome.css			          *
*								                  *
**********************************/

/* Add everything to userChrome */
gulp.task('userChrome_windows', function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userChrome-files/*.css', 'userChrome-files/windows_fixes/*.css' ])
    .pipe(concatCss('userChrome_windows.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userChrome */
gulp.task('userChrome_all', ['minify_code', 'userChrome_windows'], function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userChrome-files/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});

/* Add everything to userChrome */
gulp.task('all', ['userChrome_all', 'userContent_all'], function() {
  return gulp.src(['userChrome.css', 'userContent.css'])
    .pipe(cleanCSS({
      level : 1 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('.'));
});




/**********************************
*								                  *
*		         Other			          *
*								                  *
**********************************/


gulp.task('minify-pdf', () => {
  return gulp.src(['userContent-files/webpages/pdf.css'])
    .pipe(cleanCSS({
      level : 1 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('./userContent-files/webpages'));
});
