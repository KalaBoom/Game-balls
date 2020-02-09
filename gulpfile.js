const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync')

const scriptsFiles = [
    //'./app/libs/jquery/jquery.min.js',
    './app/js/common.min.js',
]

function styles() {
    return gulp.src("app/sass/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream())
}

function scripts() {
    return  gulp.src(scriptsFiles)
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream())
}

function commonJS(){
    return gulp.src('app/js/common.js')
        .pipe(concat('common.min.js'))
        .pipe(uglify({mangle: {toplevel: true}}))
        .pipe(gulp.dest('./app/js'))
}

function watcher() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch('./app/sass/**/*.sass', styles)
    gulp.watch('./app/js/**/common.js', gulp.series('common-js','scripts'))
    gulp.watch("./app/*.html").on('change', browserSync.reload)
}

gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('common-js', commonJS)
gulp.task('watcher', watcher)

gulp.task('default', gulp.series('styles', 'common-js', 'scripts'));