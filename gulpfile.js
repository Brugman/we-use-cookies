/**
 * Toscani's Gulp 4 gulpfile template.
 *
 * Template last updated: 2019-12-17.
 * File last updated:     2020-12-03.
 */

/**
 * Directories.
 */
var dir = {
    php: '.',
    input: {
        js:   '.',
        less: '.',
    },
    output: {
        js:   '.',
        less: '.',
    },
};

/**
 * Packages.
 */
var gulp         = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );
var cleancss     = require( 'gulp-clean-css' );
var concat       = require( 'gulp-concat' );
var filter       = require( 'gulp-filter' );
var gulpif       = require( 'gulp-if' );
var livereload   = require( 'gulp-livereload' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var rename       = require( 'gulp-rename' );
var less         = require( 'gulp-less' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var uglify       = require( 'gulp-uglify' );
var babel        = require( 'gulp-babel' );
var argv         = require( 'minimist' )( process.argv.slice( 2 ) );

/**
 * Environment.
 */
var env = ( argv.env ? argv.env : 'dev' );

/**
 * Config.
 */
var config = {
    run_sourcemaps:   ( env == 'dev' ? true : false ),
    run_minification: ( env == 'dev' ? false : true ),
};

/**
 * Feedback.
 */
console.log( '' );
console.log( 'Environment:  '+( env == 'dev' ? 'Development' : 'Production' ) );
console.log( '' );
console.log( 'Sourcemaps:   '+( config.run_sourcemaps ? 'Yes' : 'No' ) );
console.log( 'Minification: '+( config.run_minification ? 'Yes' : 'No' ) );
console.log( '' );

/**
 * Plumber notification.
 */
var onError = function ( error ) {

    notify.onError({
        title: "Error in "+error.filename.replace( /^.*[\\\/]/, '' )+" on line "+error.line,
        message: "-\n"+error.extract,
        appID: "Gulp",
    })( error );

    this.emit('end');
};

/**
 * Procedures.
 */
var app = [];

app.processJS = function ( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: onError } ) )
        // start the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.init() ) )
        // compile
        .pipe( babel( { presets: ['@babel/env'] } ) )
        // concat the js
        .pipe( concat( args.outputFile ) )
        // minify the js
        .pipe( gulpif( config.run_minification, uglify() ) )
        // finish the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.write( '.' ) ) )
        // place the output file
        .pipe( gulp.dest( args.outputDir ) )
        // remove the sourcemap from the stream
        .pipe( gulpif( config.run_sourcemaps, filter( [ '**/*.js' ] ) ) )
        // notify
        .pipe( notify({
            title: "Processed",
            message: args.name,
            appID: "Gulp",
        }) )
        // reload the site
        .pipe( livereload() );
};

app.processLess = function ( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: onError } ) )
        // start the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.init() ) )
        // compile the less to css
        .pipe( less() )
        // autoprefix the css
        .pipe( autoprefixer( 'last 10 versions' ) )
        // minify the css
        .pipe( gulpif( config.run_minification, cleancss( { keepSpecialComments: 0 } ) ) )
        // name the output file
        .pipe( rename( args.outputFile ) )
        // finish the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.write( '.' ) ) )
        // place the output file
        .pipe( gulp.dest( args.outputDir ) )
        // remove the sourcemap from the stream
        .pipe( gulpif( config.run_sourcemaps, filter( [ '**/*.css' ] ) ) )
        // notify
        .pipe( notify({
            title: "Processed",
            message: args.name,
            appID: "Gulp",
        }) )
        // reload the site
        .pipe( livereload() );
};

/**
 * Tasks: JS.
 */
gulp.task( 'js_plugin', function ( done ) {
    app.processJS({
        'name'       : 'plugin js',
        'inputFiles' : [ dir.input.js+'/we-use-cookies.js' ],
        'outputDir'  : dir.output.js,
        'outputFile' : 'we-use-cookies.min.js',
    });
    done();
});

/**
 * Tasks: Less.
 */
gulp.task( 'less_plugin', function ( done ) {
    app.processLess({
        'name'       : 'plugin less',
        'inputFiles' : [ dir.input.less+'/we-use-cookies.less' ],
        'outputDir'  : dir.output.less,
        'outputFile' : 'we-use-cookies.min.css',
    });
    done();
});

/**
 * Task: Livereload.
 */
gulp.task( 'livereload', function ( done ) {
    livereload.reload();
    done();
});

/**
 * Task: Watch.
 */
gulp.task( 'watch', function () {
    // start livereload
    livereload.listen();
    // JavaScript
    gulp.watch( dir.input.js+'/we-use-cookies.js',   gulp.parallel( 'js_plugin' ) );
    // Less
    gulp.watch( dir.input.less+'/we-use-cookies.less', gulp.parallel( 'less_plugin' ) );
    // PHP
    gulp.watch( dir.php+'/**/*.php', gulp.parallel( 'livereload' ) );
    // notify
    gulp.src( 'node_modules/gulp-notify/test/fixtures/1.txt' ).pipe( notify({
        title: "Gulp watch is ready.",
        message: " ",
        appID: "Gulp",
    }) );
});

/**
 * Task: Default.
 */
gulp.task( 'default', gulp.parallel(
    'js_plugin',
    'less_plugin',
));

