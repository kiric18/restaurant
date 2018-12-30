var gulp = require('gulp');
var chmod = require('gulp-chmod');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var paths = require('../paths');

gulp.task('clean-files', function() {
  return gulp.src([paths.output, paths.root, paths.exportSrv, paths.asset])
    .pipe(vinylPaths(del));
});

gulp.task('clean-unbundle', function() {
  return gulp.src([paths.config])
  .pipe(chmod({owner:{write:true}}))
  .pipe(vinylPaths(del));
});

gulp.task('clean', function(callback) {
  return runSequence(
    ['clean-unbundle','clean-files'],
    //['clean-files'],
    callback
  );
});

