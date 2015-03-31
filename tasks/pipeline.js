/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  '../bower_components/bootstrap/dist/css/bootstrap.min.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Dependencies like sails.io.js, jQuery, or Angular
  // are brought in here
  'js/dependencies/**/*.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/marked/marked.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/metisMenu/dist/jquery.metisMenu.min.js',
  'bower_components/raphael/raphael-min.js',
  'bower_components/morrisjs/morris.min.js',
  'bower_components/sb-admin-v2/js/sb-admin.js',
  'bower_components/tinycolor/tinycolor.js',
  'bower_components/angular-bootstrap/ui-bootstrap.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower_components/angularjs-color-picker/angularjs-color-picker.js',
  'bower_components/angular-messages/angular-messages.min.js',
  'bower_components/ng-fab-form/dist/ng-fab-form.min.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/satellizer/satellizer.js',
  'bower_components/moment/min/moment.min.js',
  'bower_components/moment/locale/fr.js',
  'bower_components/angular-moment/angular-moment.min.js',
  'bower_components/angularSails/dist/ngsails.io.js',
  'bower_components/Chart.js/Chart.js',
  'bower_components/angular-chart.js/dist/angular-chart.js',
  'bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
  'bower_components/ng-file-upload/angular-file-upload-shim.js',
  'bower_components/ng-file-upload/angular-file-upload.js',
  'bower_components/message-center/message-center.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/ng-file-upload/angular-file-upload-shim.min.js',
  'bower_components/ng-file-upload/angular-file-upload.min.js',
  'bower_components/jsTag/jsTag/compiled/jsTag.min.js',
  // 'bower_components/ng-load/ng-load.js',
  // 'bower_components/sb-admin-v2/demo/js/dashboard-demo.js',
  // 'js/plugin/jquery.js',
  

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  // 'js/plugin/**/*.js',
  'js/backoffice/app.js',
  'js/backoffice/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
