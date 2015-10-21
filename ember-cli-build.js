/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      extension: 'scss' // or sass
    }
  });

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

  app.import('bower_components/semantic/dist/semantic.min.css');
  app.import('bower_components/semantic/dist/semantic.min.js');

  var semanticUiFonts = pickFiles('bower_components/semantic/dist/themes/default/assets/fonts', {
    srcDir: '/',
    destDir: '/assets/themes/default/assets/fonts'
  });

  return app.toTree([semanticUiFonts]);
};
