var gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
connect = require('gulp-connect'),
uglifycss = require('gulp-uglifycss');

gulp.task('connect', function(){
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('sass',  function(){
  return gulp.src('app/stylesheets/sass/main.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(rename('style.css'))
    .pipe(gulp.dest('app/stylesheets/css'))
    .pipe(connect.reload());
});

// watch task
gulp.task('watch', function(){
  gulp.watch(['app/stylesheets/sass/**/*.scss' , 'app/*.html'], gulp.series('sass'));
});

//default Gulp task
gulp.task('default',gulp.parallel('connect','watch'));
