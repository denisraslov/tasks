var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('browserify', function(){
    var b = browserify();
    b.transform(reactify); // use the reactify transform
    b.add('./main.js');

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist'));
});

var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
    gulp.src('./styles.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./dist'));
});

var webserver = require('gulp-webserver');
var server = {
    host: 'localhost',
    port: '9000'
};

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: true
        }));
});

gulp.task('default', ['browserify', 'less']);