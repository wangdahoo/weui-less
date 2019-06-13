const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')
const header = require('gulp-header')
const autoprefixer = require('autoprefixer')
const pkg = require('./package.json')

const dist = process.env.DIST || 'dist'

gulp.task('build', function () {
  const banner = [
    '/*!',
    ' * WeUI v<%= pkg.weui.version %>',
    ' */',
    ''
  ].join('\n')

  gulp
    .src(['src/weui.less'], { base: 'src' })
    .pipe(less())
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
      })
    )
    .pipe(header(banner, { pkg: pkg }))
    .pipe(
      rename(function (path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(`${dist}`))
})
