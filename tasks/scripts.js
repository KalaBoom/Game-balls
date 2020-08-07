const
    {src, dest} = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    terser = require('gulp-terser'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat')

const scriptsArray = [
    'src/scripts/components/Shape.js',
    'src/scripts/components/Ball.js',
    'src/scripts/components/Game.js',
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