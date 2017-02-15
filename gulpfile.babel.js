"use strict";

///////////////////////
// IMPORT NODE MODULES
///////////////////////

import gulp from "gulp"

import browsersync from "browser-sync"

import watch from "gulp-watch"

import sass from "gulp-sass"
import cleancss from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer"
import rename from "gulp-rename"

import uglify from "gulp-uglify"

///////////////////////
// TASK - BROWSER SYNC
///////////////////////

const browserSync = browsersync.create();

let reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./"
    });
    
    gulp.watch("styles/main.min.css").on("change", reload);
    gulp.watch("index.html").on("change", reload);
    gulp.watch("scripts/main.min.js").on("change", reload);
});

///////////////////////
// TASK - STYLES
///////////////////////

gulp.task("styles", () => {
	return gulp.src("styles/main.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleancss())
		.pipe(rename("main.min.css"))
		.pipe(gulp.dest("styles/"))
});

gulp.task("styles2", () => {
	return gulp.src("styles/main.scss")
		.pipe(sass())
		.pipe(rename("main.css"))
		.pipe(gulp.dest("styles/"))
});

///////////////////////
// TASK - SCRIPTS
///////////////////////

gulp.task("scripts", () => {
	return gulp.src("scripts/main.js")
		.pipe(uglify())
		.pipe(rename("main.min.js"))
		.pipe(gulp.dest("scripts/"))
});

///////////////////////
// TASK - WATCH
///////////////////////

gulp.task("watch", () => {
	gulp.watch("styles/main.scss", ["styles"]);
	gulp.watch("styles/main.scss", ["styles2"]);
	gulp.watch("index.html");
	gulp.watch("scripts/main.js", ["scripts"]);
});

///////////////////////
// TASK - DEFAULT
///////////////////////

gulp.task("default", ["watch", "browser-sync", "styles2", "styles", "scripts"]);

