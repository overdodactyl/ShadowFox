'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var exec = require('gulp-exec');

/* Minify all base code, edit in place */
gulp.task('minify_base_code', () => {
  return gulp.src(['common-files/*.css', 'userContent-files/*.css', 'userContent-files/*/*.css', 'userChrome-files/*', 'userChrome-files/*/*.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

/* Remove internal UUIDs */
gulp.task('remove_UUIDs', function() {
  return gulp.src('.')
    .pipe(exec('sh remove_UUIDs.sh'))
});



/* userContent file with no addons */
gulp.task('userContent_no_addons', function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userContent-files/*.css'])
    .pipe(concatCss('userContent_no_addons.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userContent */
gulp.task('userContent', ['userContent_no_addons'], function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userContent-files/*.css', 'userContent-files/*/*.css'])
    .pipe(concatCss('userContent.css'))
    .pipe(gulp.dest('.'));
});


/* Create Windows version */
gulp.task('userChrome_windows', function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userChrome-files/*.css', 'userChrome-files/windows_fixes/*.css' ])
    .pipe(concatCss('userChrome_windows.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userChrome */
gulp.task('userChrome', ['userChrome_windows'], function() {
  return gulp.src(['color_variables.css', 'common-files/*.css', 'userChrome-files/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});



/* All */
gulp.task('all', ['userChrome', 'userContent'], function() {
  return gulp.src(['userChrome.css', 'userContent.css'])
    .pipe(cleanCSS({
      level : 1 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('.'));
});

/* Publish */
gulp.task('publish', ['remove_UUIDs', 'minify_base_code', 'userChrome', 'userContent'], function() {
  return gulp.src(['userChrome.css', 'userContent.css', 'alternative_user_files/*.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

/* Gulp Push - used to push to GitHub and re-add internal UUIDs */
gulp.task('push', function() {
  return gulp.src('.')
    .pipe(exec('git push'))
    .pipe(exec('sh add_UUIDs.sh'))
});
