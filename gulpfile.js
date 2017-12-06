var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify'),
concat = require('gulp-concat');
var connect = require('gulp-connect');
var webserver = require('gulp-webserver');

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
      root: '.',
      livereload: true
      
    })
  });

  gulp.task('default', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT:8080
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

  gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        path: "server.js",
        livereload: true,
        directoryListing: true,
        open: true
      }));
  });