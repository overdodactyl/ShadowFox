'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var exec = require('gulp-exec');

/* Minify all base code, edit in place */
gulp.task('minify_base_code', function() {
  return gulp.src(['css/common-files/*.css', 'css/userContent-files/*.css', 'css/userContent-files/*/*.css', 'css/userChrome-files/*', 'userChrome-files/*/*.css'])
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
    .pipe(exec('sh scripts/remove_UUIDs.sh'))
});



/* userContent file with no addons */
gulp.task('userContent_no_addons', function() {
  return gulp.src(['css/common-files/*.css', 'css/userContent-files/*.css'])
    .pipe(concatCss('userContent_no_addons.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userContent */
gulp.task('userContent', gulp.parallel('userContent_no_addons', function() {
  return gulp.src(['css/common-files/*.css', 'css/userContent-files/*.css', 'css/userContent-files/*/*.css'])
    .pipe(concatCss('userContent.css'))
    .pipe(gulp.dest('.'));
}));


/* Create Windows version */
gulp.task('userChrome_windows', function() {
  return gulp.src(['css/common-files/*.css', 'css/userChrome-files/*.css', 'css/userChrome-files/windows_fixes/*.css' ])
    .pipe(concatCss('userChrome_windows.css'))
    .pipe(gulp.dest('./alternative_user_files'));
});


/* Add everything to userChrome */
gulp.task('userChrome', gulp.parallel('userChrome_windows', function() {
  return gulp.src(['css/common-files/*.css', 'css/userChrome-files/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
}));

/* Minify final user files */
gulp.task('minify_final', function() {
  return gulp.src(['userChrome.css', 'userContent.css', 'alternative_user_files/*.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});




/* All */
gulp.task('all', gulp.parallel('userChrome', 'userContent', function() {
  return gulp.src(['userChrome.css', 'userContent.css'])
    .pipe(cleanCSS({
      level : 1 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('.'));
}));

/* Publish */
gulp.task('publish', gulp.series('remove_UUIDs', 'minify_base_code', 'userChrome', 'userContent', 'minify_final'));



/* Gulp Push - used to push to GitHub and re-add internal UUIDs */
gulp.task('push', function() {
  return gulp.src('.')
    .pipe(exec('git push'))
    .pipe(exec('sh scripts/add_UUIDs.sh'))
});
