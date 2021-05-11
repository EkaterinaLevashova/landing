const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer'); // не используется
const sourcemaps = require('gulp-sourcemaps');



/*----------Server----------*/
gulp.task('server', function() {
    browserSync.init({
      server: {
        port: 9000,
        baseDir: 'build'
      },
    })

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/*----------Styles compile----------*/
gulp.task('styles:compile', function (){
    return gulp.src('source/styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
});

/*----------Js----------*/
gulp.task('js', function() {
    return gulp.src([
        'source/js/form.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

/*----------Delete----------*/
// gulp.task('clean', function del(cb) {
//     return rimraf('build', cb); //plagin for delete
// });

/*----------Copy html----------*/
gulp.task('copy:templates', function buildHTML(){
    return gulp.src('source/template/index.html')
    .pipe(gulp.dest('build'));
});

/*----------Copy fonts----------*/
gulp.task('copy:fonts', function() {
    return gulp.src('./source/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

/*----------Copy images----------*/
gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

/*----------Copy----------*/
gulp.task('copy', gulp.parallel('copy:templates', 'copy:fonts', 'copy:images'));

/*----------Watchers----------*/
gulp.task('watch', function() {
    gulp.watch('source/template/**/*.html', gulp.series('copy:templates'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/js/**/*.js', gulp.series('js'));
});

/*----------Default----------*/
gulp.task('default', gulp.series(
    gulp.parallel('styles:compile', 'js', 'copy'),
    gulp.parallel('watch', 'server')
    )
);