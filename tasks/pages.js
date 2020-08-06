const
    {src, dest} = require('gulp'),
    validatorHtml = require('gulp-w3c-html-validator'),
    validatorBem = require('gulp-html-bem-validator'),
    plumber = require('gulp-plumber')
    //pug = require('gulp-pug')

module.exports = function pages() {
    return src('src/pages/*.html')
        .pipe(plumber())
        //.pipe(pug())
        .pipe(validatorHtml())
        .pipe(validatorBem())
        .pipe(dest('build'))
}