var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    app = {
    	js : ['www/public/js/utils.js', 'www/public/js/main.js']
    }

gulp.task('connect', function() {
  connect.server({
    root : 'www',
    livereload : true,
    port : 3000
  });
});
 
gulp.task('html', function () {
  gulp.src('./www/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(app.js)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./www/public/js'));
});

gulp.task('watch', function () {
  gulp.watch(['./www/*.html'], ['html']);
});

gulp.task('default', ['js','connect', 'watch']);