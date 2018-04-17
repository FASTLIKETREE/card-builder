import gulp from 'gulp'
import runSequence from 'run-sequence'
import babel from 'gulp-babel'

const src = './src'
const images = './images'
const build = './build'
const dist = './dist'

gulp.task('imageBuild', function(){
  return gulp.src([images + '/*'])
  .pipe(gulp.dest(build + '/images'))
})

gulp.task('imageDist', function(){
  return gulp.src([build + '/images/*'])
  .pipe(gulp.dest(dist + '/images'))
})

gulp.task('jsBuild', function(){
  return gulp.src([src + '/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest(build))
})

gulp.task('jsDist', function(){
  return gulp.src(build + '/**/*.js')
  .pipe(gulp.dest(dist))
})

gulp.task('indexBuild', function(){
  return gulp.src('./index.js')
  .pipe(babel())
  .pipe(gulp.dest(build))
})

gulp.task('indexDist', function(){
  return gulp.src(build + '/index.js')
  .pipe(gulp.dest(build))
})

gulp.task('build', function(callback) {
  runSequence(
    'imageBuild',
    'imageDist',
    ['jsBuild', 'indexBuild'],
    ['jsDist', 'indexDist'],
    callback
    )
})

gulp.task('default', ['build'])
