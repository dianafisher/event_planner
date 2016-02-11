var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint'], function(){
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['lint']);
    gulp.watch('/index.html', ['copy-html']);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);
    
    browserSync.init({
        server: {
            baseDir:'./dist'
        }
    });
});

gulp.task('dist', [
    'copy-html',
    'copy-images',
    'styles',
    'lint',
    'scripts-dist']);

// Copy html to dist directory
gulp.task('copy-html', function(){
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
});    

// Copy images to dist/img directory
gulp.task('copy-images', function() {
    gulp.src('img/*')
        .pipe(gulp.dest('dist/img'));
});

// Create css from scss
gulp.task('styles', function(){
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function () {
    
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['js/**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());    
});

gulp.task('scripts', function(){
    gulp.src('js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function(){
    gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

