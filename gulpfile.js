var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify'),
concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('log', function() {
    gutil.log('== My Log Task ==')
  });

  gulp.task('js', function() {
    gulp.src('controllers/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('assets'))
  });

  gulp.task('connect', function() {
    connect.server({
      root: 'server.js',
      livereload: true
    })
  });