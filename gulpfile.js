var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts', 'html', 'img'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });

});

gulp.task('html', function() {
    return gulp.src('_index.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp.src('sass/*.sass')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 15 versions'], cascade: false }))

        .pipe(rename('style.css'))
        // .pipe(minifycss())
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
    return gulp.src([
            'bower_components/jquery/jquery.min.js',
            'bower_components/owl.carousel/dist/owl.carousel.min.js',
            'bower_components/masonry/dist/masonry.pkgd.min.js',
            'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
            'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
            'bower_components/imagefill/js/jquery-imagefill.js',
            'bower_components/jquery-ui/jquery-ui.min.js',
            'bower_components/jquery-ui/ui/i18n/datepicker-ru.js',
            'bower_components/jquery-touchswipe/jquery.touchSwipe.min.js',
            'js/_scripts.js'

        ])
        .pipe(concat('scripts.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    gulp.src('images-raw/*.{png,jpg,gif}')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true
        }))
        .pipe(gulp.dest('app/images/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('sass/*.sass', ['styles']);
    gulp.watch('images-raw/*.{png,jpg,gif}', ['img']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('*.html', ['html']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/*.css').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
