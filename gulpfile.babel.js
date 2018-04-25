import childProcess from 'child_process'
import gulp from 'gulp'
import runSequence from 'run-sequence'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import watch from 'gulp-watch'
import request from 'request'
import log from 'fancy-log'

const exec = childProcess.exec

const src = './src'
const images = './images'
const build = './build'
const dist = './dist'

//Keep in case we need to transform images in the build step
gulp.task('image', function(cb) {
  runSequence(
    'imageBuild',
    'imageDist',
    'imageCache',
    cb 
    )
})

gulp.task('imageBuild', function(){
  return gulp.src([images + '/*'])
  .pipe(gulp.dest(build + '/images'))
})

gulp.task('imageDist', function(){
  return gulp.src([build + '/images/*'])
  .pipe(gulp.dest(dist + '/images'))
})

gulp.task('imageCache', function(cb){
  exec(`node ${build}/index.js`, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('js', ['lint'], function(){
  return gulp.src(['./index.js', src + '/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest(dist))
})

gulp.task('lint', function() {
  return gulp.src([src + '/**/*.js'])
  .pipe(eslint())
})

gulp.task('watchCode', function() {
  return watch(['./index.js', src + '/**/*.js', images + '/*'], function() {
    runSequence('js')
  })
})

gulp.task('watchCard', function() {
  return watch([dist + '/index.js'], function() {
    runSequence('genCard')
  })
})

gulp.task('chrome', function() {
  return watch(dist + '/capture.html', function() {
    runSequence('refresh')
  })
})

gulp.task('genCard', function(cb) {
  exec(`node ${dist}/index.js`, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('refresh', function(cb) {
  log('refreshing chrome')

  const headers = {
  'Content-Type': 'application/json'
  }

  const options = {
    url: 'http://localhost:8080/refresh',
    method: 'POST',
    headers: headers
  }

  request(options, function (err, res, body) {
    if (err) throw err
    cb()
  })
})

gulp.task('default', ['js'])
