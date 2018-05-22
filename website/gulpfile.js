'use strict';

var gulp = require('gulp');
var log = require('fancy-log');
//var concatCss = require('gulp-concat-css');
//var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
//var purify = require('gulp-purifycss');
var critical = require('critical').stream;
var deploy = require('gulp-gh-pages');

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('./index.html')
        .pipe(critical({
          inline: true,
          base: 'test/',
          css: ['index.css']
        }))
        .on('error', function(err) { log.error(err.message); })
        .pipe(rename("index-critical.html"))
        .pipe(gulp.dest('.'));
});

// Push build to gh-pages
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});



//gulp.task('publish', gulp.series('combine', 'minify-css', 'critical'));
