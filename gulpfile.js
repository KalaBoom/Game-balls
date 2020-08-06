const 
    {series, parallel} = require('gulp')
    clean = require('./tasks/del'),
    styles = require('./tasks/styles')
    scripts = require('./tasks/scripts')
    pages = require('./tasks/pages')
    browser = require('./tasks/browser')
    images = require('./tasks/image')
    fonts = require('./tasks/fonts')

const dev = parallel(pages, styles, scripts, images, fonts)
const build = series(clean, dev)

module.exports.dev = series(build, browser)
module.exports.build = build
module.exports.pages = pages
