var gulp = require('gulp')
var less = require('gulp-less')
var rename = require('gulp-rename')
var postcss = require('gulp-postcss')
var cssnano = require('gulp-cssnano')
var header = require('gulp-header')
var autoprefixer = require('autoprefixer')
var pkg = require('./package.json')

gulp.task('build', function () {
  var banner = [
    '/*!',
    ' * WeUI v<%= pkg.weui.version %>',
    ' */',
    ''
  ].join('\n')

  gulp
    .src(['src/weui.less', 'dist/*.wxss'], { base: 'src' })
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
    .pipe(gulp.dest('dist'))
})
