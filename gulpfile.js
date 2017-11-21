var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    del = require('del'),
    destination = 'dist';

gulp.task('html', function () {
    gulp.src('./src/html/*')
        .pipe(gulp.dest(destination))
});

gulp.task('js', function () {
    gulp.src('./src/js/*')
        .pipe(gulp.dest(destination))
});

gulp.task('img', function () {
    gulp.src('./src/img/*')
        .pipe(gulp.dest(destination + '/img/'))
});

gulp.task('clean', function () {
  del([destination + '/**/*']);
});

gulp.task('less', function () {
    gulp.src('./src/less/pathfora.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename("lytics_overrides.css"))
        .pipe(gulp.dest(destination))
        .pipe(cssmin())
        .pipe(rename("lytics_overrides.min.css"))
        .pipe(gulp.dest(destination))

});

gulp.task('preview', function () {
  connect.server({
    port: 1234,
    root: destination,
    livereload: true
  });
});

gulp.task('watch', function () {
    gulp.watch([
        'src/less/**/*.less', 
        'src/html/*.html',
        'src/js/*.js',
        'src/img/*'
    ], ['build']);
});

gulp.task('build', ['clean', 'html', 'js', 'img', 'less']);
gulp.task('default', ['build', 'preview', 'watch']);