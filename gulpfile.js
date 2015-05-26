var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass'),
  bower = require('gulp-bower');

gulp.task('sass', function () {
  return sass('./public/app/assets')
    .pipe(gulp.dest('./public/app/assets'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/app/assets/*.scss', ['sass']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
});

gulp.task('default', [
  'sass',
  'develop',
  'watch',
  'bower'
]);
