const
    {src, dest} = require('gulp')

module.exports = function pages() {
    return src('src/fonts/*')
        .pipe(dest('build/webfonts'))
}