"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minifyCss = require("gulp-csso");
var csscomb = require('gulp-csscomb');
var gcmq = require('gulp-group-css-media-queries');

var server = require("browser-sync").create();

var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var del = require("del");

var imageMin = require("gulp-imagemin");
var tinymin = require('gulp-tinypng');
var webp = require("gulp-webp");
var svgStore = require("gulp-svgstore");

var postHtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlMin = require("gulp-htmlmin");

var typeOfCompression = 4;
var qualityOfImage = 75;

var gih = require("gulp-include-html");

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gcmq())
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

//tinypng api key gTuVPxhcb65R4KUvguBnOL3LRdjAFRFu

gulp.task('tinypng', function () {
    gulp.src('source/img/*.{png,jpg}')
        .pipe(tinymin('gTuVPxhcb65R4KUvguBnOL3LRdjAFRFu'))
        .pipe(gulp.dest('build/img'));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imageMin([
      imageMin.optipng({optimizationLevel: typeOfCompression}),
      imageMin.jpegtran({progressive: true}),
      imageMin.svgo({
        plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/*.{png,jpg}")
    .pipe(webp({quality: 95,
                lossless: false}))
    .pipe(gulp.dest("build/img/webp"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgStore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(postHtml([include({ encoding: 'utf8', root: './source/' })]))
    // .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/fonts/**/*",
    "source/img/**",
    "source/js/**",
    "source/css/*.css",
    "source/video/*.*"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (done) {
  runSequence(
    "clean",
    "copy",
    "style",
    "tinypng",
    // "sprite",
    "html",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/**/*.html", ["html"]);
});
