var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');

var spawn = require('child_process').spawn;


// the browser sync ui is at localhost:3001
gulp.task('serve', function() {
  browserSync.init({
    codeSync: false,
    // files: ['**'],
    port: 4000,
    ghostMode: false,
    server: {
      baseDir: '.'
    },
    notify: false,
    reloadDelay: 1000
  });


  var scss = gulp.watch(['sass/*.scss', 'sass/*.css']);

  scss.on('change', function(path, stats) {

    gutil.log('css: ' + path);

    gulp.src(path)
      // .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('static/css/'))
      .pipe(browserSync.stream());

  });

  gulp.watch(["*.html"]).on('change', browserSync.reload);

});


gulp.task('css', function(done) {
  gulp.src(['sass/*.scss', 'sass/*.css'])
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/css/'));

  // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
  done();
});


gulp.task('default', gulp.parallel('css', 'serve'));