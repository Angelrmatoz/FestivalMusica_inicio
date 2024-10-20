const { src, dest, watch, series } = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');

const sass = gulpSass(dartSass);

function js(done) {
    return src('src/js/app.js')
        .pipe(dest('build/js'));
}

function css(done) {
    return src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: '.' }));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

exports.css = css;
exports.dev = dev;

exports.default = series(js, css, dev);
