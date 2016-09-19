var gulp = require('gulp');
var tsc = require('gulp-typescript');

gulp.task('default', ['copy:libs', 'transpile:ts', 'copy:appresources'], function () { });

gulp.task('copy:libs', ['copy:libs:prereq', 'copy:libs:angular']);

gulp.task('copy:libs:prereq', ['copy:libs:rxjs'], function () {
    return gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.js'
    ])
        .pipe(gulp.dest('wwwroot/scripts/libs'));
});

gulp.task('copy:libs:rxjs', function () {
    return gulp.src([
            'node_modules/rxjs/**/*.js',
    ])
        .pipe(gulp.dest('wwwroot/scripts/libs/rxjs'));
});

gulp.task('copy:libs:angular', function () {
    return gulp.src([
            'node_modules/@angular/**/bundles/*.umd.js',
            'node_modules/@angular/**/bundles/*.umd.min.js',
            '!node_modules/@angular/**/bundles/*-testing.umd.js'
    ])
        .pipe(gulp.dest('wwwroot/scripts/libs/@angular'));
});

gulp.task('copy:appresources', function () {
    return gulp.src([
            'ngApp/**/*.html',
            'ngApp/**/*.css'
    ])
        .pipe(gulp.dest('wwwroot/scripts/app'));
});

gulp.task('transpile:ts', function () {
    var tsProject = tsc.createProject('tsconfig.json');

    return gulp.src('ngApp/**/*.ts')
        .pipe(tsc(tsProject))
        .pipe(gulp.dest('wwwroot/scripts/app'));
});

gulp.task('watch', ['copy:libs', 'transpile:ts', 'copy:appresources'], function () {
    gulp.watch(['ngApp/**/*.ts'], ['transpile:ts']);
    gulp.watch(['ngApp/**/*.html', 'ngApp/**/*.css'], ['copy:appresources']);
});