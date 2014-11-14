var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    traceur = require('gulp-traceur'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    copy = require('gulp-copy');

/**
 * CONFIG
 */
var server = {
        host: 'localhost',
        port: 3000
    },
    sources = {
        jade: './**/*.jade',
        es6scripts: './scripts/**/*.js',
        compiledEntryScript: './dist/js/compiled/main.js',
        stylus: './styles/main.styl',
        assets: './assets/**/*'
    },
    distSources = {
        root: './dist',
        compiledJs: './dist/js/compiled',
        js: './dist/js',
        css: './dist/css'
    };

/**
 * PUT DEV SERVER UP
 */
gulp.task('connect', function() {
    connect.server({
        root: distSources.root,
        livereload: true,
        host: server.host,
        port: server.port
    });
});

/**
 * OPEN THE DEFAULT BROWSER AT THE SERVER URL
 */
gulp.task('open', function() {
    gulp.src(sources.compiledEntryScript)
        .pipe(open('', {url: 'http://' + server.host + ':' + server.port}));
});

/**
 * COPY ASSETS FOLDER
 */
gulp.task('copy', function() {
    gulp.src(sources.assets)
        .pipe(copy(distSources.root));
});

/**
 * COMPILE JADE SOURCES IN DEVELOP MODE
 */
gulp.task('jade-dev', function() {
    gulp.src([sources.jade, '!./node_modules/**/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(distSources.root))
        .pipe(connect.reload());
});

/**
 * COMPILE JADE SOURCES IN PRODUCTION MODE
 */
gulp.task('jade-prod', function() {
    gulp.src([sources.jade, '!./node_modules/**/*.jade'])
        .pipe(jade({
            pretty: false
        }))
        .pipe(gulp.dest(distSources.root));
});

/**
 * COMPILE STYLUS CODE
 */
gulp.task('stylus-dev', function() {
    gulp.src(sources.stylus)
        .pipe(stylus())
        .pipe(gulp.dest(distSources.css))
        .pipe(connect.reload());
});

/**
 * COMPILE AND MINIFY STYLUS CODE
 */
gulp.task('stylus-prod', function() {
    gulp.src(sources.stylus)
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(distSources.css));
});

/**
 * COMPILE ES6 TO ES5
 */
gulp.task('traceur', function() {
    gulp.src('./node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js')
        .pipe(gulp.dest(distSources.js));

    return gulp.src(sources.es6scripts)
        .pipe(traceur({modules: 'commonjs', experimental: true}))
        .pipe(gulp.dest(distSources.compiledJs));
});

/**
 * BUNDLE JS MODULES
 */
gulp.task('browserify-dev', ['traceur'], function() {
    gulp.src(sources.compiledEntryScript)
        .pipe(browserify())
        .pipe(gulp.dest(distSources.js))
        .pipe(connect.reload());
});

/**
 * BUNDLE AND MINIFY JS MODULES
 */
gulp.task('browserify-prod', ['traceur'], function() {
    gulp.src(sources.compiledEntryScript)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(distSources.js));
});

/**
 * DEVELOPMENT WATCHER WITH LIVE RELOAD
 */
gulp.task('serve', ['jade-dev', 'stylus-dev', 'browserify-dev', 'copy', 'connect', 'open'], function() {
    gulp.watch(sources.jade, ['jade-dev']);
    gulp.watch('./styles/**/*.styl', ['stylus-dev']);
    gulp.watch('./scripts/**/*.js', ['traceur', 'browserify-dev']);
});

/**
 * DEFAULT: CREATE DIST FILES
 */
gulp.task('default', ['jade-prod', 'stylus-prod', 'browserify-prod', 'copy']);