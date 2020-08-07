const
    {src, dest} = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    terser = require('gulp-terser'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat')

const scriptsArray = [
    'src/scripts/classes/Shape.js',
    'src/scripts/classes/Ball.js',
    'src/scripts/script.js'
]

module.exports = function scripts() {
    return src(scriptsArray)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(dest('build/scripts'))
}