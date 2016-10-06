var gulp = require('gulp');


var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var handlebars = require('gulp-compile-handlebars'); //add handlebars
var rename = require('gulp-rename'); //file renaming
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify'); //minify javascript
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano'); //minify css
var del = require('del'); //clean up files
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var fileinclude = require('gulp-file-include');
var speakers = require('./app/data/users.json');

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
  // Other watchers
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//move fonts to font folder
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('handlebars', function() {  

    for(var i=0; i<speakers.length; i++) {
        var speaker = speakers[i],
            fileName = speaker.fullName.replace(/ +/g, '-').toLowerCase();

        gulp.src('app/templates/'+speaker.template)
            .pipe(fileinclude({
              prefix: '@@',
              basepath: '@file'
            }))
            .pipe(handlebars(speaker))
            .pipe(rename("index.html"))
            .pipe(gulp.dest('dist/users/'+fileName));
    }
});


gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    [ 'handlebars', 'sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence([ 'handlebars', 'sass', 'browserSync', 'watch'],
    callback
  )
})

