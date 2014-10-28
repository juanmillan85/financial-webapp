/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

//module.exports = app.toTree();
// Import a couple of modules;
var compileSass = require('broccoli-sass');
//var mergeTrees  = require('broccoli-merge-trees');

// List all of the directories containing SASS source files
var sassSources = [
  'app/styles',
  'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap'
]

// Compile a custom sass file, with the sources that need to be included
var appCss = compileSass( sassSources , 'app.scss', 'assets/vendor.css');

// Merge the ember app and the custom css into a single tree for export
//var appAndCustomDependencies = mergeTrees([app.toTree(),appCss], {
//  overwrite: true
//});

// EXPORT ALL THE THINGS!
//module.exports = appAndCustomDependencies;

app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
app.import('bower_components/bootstrap-sass-official/assets/stylesheets/_bootstrap.scss');

app.import('bower_components/fontawesome/scss/font-awesome.scss');
app.import('bower_components/twitter-text/twitter-text.js');
var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: 'fonts/bootstrap'
});
var awesomeFonts = pickFiles('bower_components/fontawesome/fonts', {
    srcDir: '/',
    destDir: 'fonts/font-awesome'
});
// Merge the bootstrapFonts with the ember app tree
var mergeTrees = require('broccoli-merge-trees');
module.exports = mergeTrees([app.toTree(),bootstrapFonts,awesomeFonts]);
