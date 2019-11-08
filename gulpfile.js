var gulp = require("gulp"),
  less = require("gulp-less"),
  cssmin = require("gulp-cssmin"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  connect = require("gulp-connect"),
  del = require("del"),
  destination = "dist";

gulp.task("html", async function() {
  gulp.src("./src/html/*").pipe(gulp.dest(destination));
});

gulp.task("js", async function() {
  gulp.src("./src/js/*").pipe(gulp.dest(destination));
});

gulp.task("img", async function() {
  gulp.src("./src/img/*").pipe(gulp.dest(destination + "/img/"));
});

gulp.task("clean", async function() {
  del.sync([destination + "/**/*"]);
});

gulp.task("less", async function() {
  gulp
    .src("./src/less/pathfora.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(rename("lytics_overrides.css"))
    .pipe(gulp.dest(destination))
    .pipe(cssmin())
    .pipe(rename("lytics_overrides.min.css"))
    .pipe(gulp.dest(destination));
});

gulp.task("preview", async function() {
  connect.server({
    port: 1234,
    root: destination,
    livereload: true
  });
});

gulp.task("watch", async function() {
  gulp.watch(
    ["src/less/**/*.less", "src/html/*.html", "src/js/*.js", "src/img/*"],
    gulp.series("build")
  );
});

gulp.task("build", gulp.parallel("clean", "html", "js", "img", "less"));
gulp.task("default", gulp.series("build", "preview", "watch"));
