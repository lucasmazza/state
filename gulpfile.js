var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    exec = require('child_process').exec;

gulp.task('lint', function () {
  gulp.src(['state.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function (cb) {
  exec('phantomjs test/runner.js test/index.html', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['lint', 'test']);
