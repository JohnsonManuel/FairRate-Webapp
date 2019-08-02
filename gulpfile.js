var gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
browserSync = require('browser-sync').create(),
uglifycss = require('gulp-uglifycss');


gulp.task('sass',  function(){
  return gulp.src('app/stylesheets/sass/main.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(rename('style.css'))
    .pipe(gulp.dest('app/stylesheets/css'))
    .pipe(browserSync.stream());
});


//watch task
gulp.task('watch', function(){
  gulp.watch(['app/stylesheets/sass/**/*.scss' , 'app/*.html'], gulp.series('sass'));
});

//browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
  gulp.watch(['app/stylesheets/sass/**/*.scss' , 'app/*.html'], gulp.series('sass'));
  browserSync.watch('app/*.html').on('change', browserSync.reload);
});

//uglify-css
gulp.task('uglify', function () {
  gulp.src('app/stylesheets/css/style.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('app.stylesheets/css'))
});

//default Gulp task
gulp.task('default',gulp.series('browserSync'));
