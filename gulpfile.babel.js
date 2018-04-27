import childProcess from 'child_process'
import gulp from 'gulp'
import runSequence from 'run-sequence'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import watch from 'gulp-watch'
import request from 'request'
import log from 'fancy-log'
import gutil from 'gulp-util'

const exec = childProcess.exec

const src = './src'
const img = './img'
const build = './build'
const dist = './dist'

//Keep in case we need to transform imgs in the build step
gulp.task('img', function(cb) {
  runSequence(
    'imgBuild',
    'imgDist',
    'imgCache',
    cb 
    )
})

gulp.task('imgBuild', function(){
  return gulp.src([img + '/*'])
  .pipe(gulp.dest(build + '/img'))
})

gulp.task('imgDist', function(){
  return gulp.src([build + '/img/*'])
  .pipe(gulp.dest(dist + '/img'))
})

gulp.task('imgCache', function(cb){
  exec('"./node_modules/.bin/babel-node" "./src/imgCache/imgCache.js"', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('js', ['lint'], function(){
  return gulp.src(['./index.js', src + '/*.js'])
  .pipe(babel())
  .pipe(gulp.dest(dist))
})

gulp.task('lint', function() {
  return gulp.src([src + '/**/*.js'])
  .pipe(eslint())
  .on('error', gutil.log)
  .pipe(eslint.format())
  .on('error', gutil.log)
  //.pipe(eslint.failAfterError())
})

gulp.task('watchCode', function() {
  return watch(['./index.js', src + '/*.js'], function() {
    runSequence('js')
  })
})

gulp.task('watchCard', function() {
  return watch([dist + '/index.js'], function() {
    runSequence('genCard')
  })
})

gulp.task('watchChrome', function() {
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
