var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var connect = require('gulp-connect');

// Static Server + watching scss/html files
gulp.task('connect', function(){
 connect.server({
   root: 'public',
   livereload: true
 });
  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
 return gulp.src('./scss/*.scss')
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('./public/css'));
});

gulp.task('livereload', function (){
 gulp.src('./public/**/*')
 .pipe(connect.reload());
});

gulp.task('watch', function () {
 gulp.watch('./scss/**/*.scss', ['sass']);
 gulp.watch('./public/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass','livereload']);









// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//   return gulp.src("scss/styles.scss")
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest("public/css"))
//     .pipe(browserSync.stream());
// });

// gulp.task('default', ['sass', 'serve']);