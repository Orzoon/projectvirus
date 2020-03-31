const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpPrefixer= require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();

function cssStyles(){
    return gulp.src('./scss/*.scss')
           .pipe(sass({outputStyle: "compressed"}))
           .pipe(gulpPrefixer())
           .pipe(gulp.dest('./public/stylesheets'))
           .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
    gulp.watch("./js/*.js", jsBabel);
    gulp.watch('./scss/*.scss', cssStyles)
    gulp.watch('./public/index.html').on('change', browserSync.reload)
    gulp.watch('./public/*.js').on('change', browserSync.reload)
}

exports.cssStyles = cssStyles;
exports.watch = watch;