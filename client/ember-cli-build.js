/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
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

  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Thin.woff2', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Thin.woff', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Thin.ttf', {destDir: 'font/roboto'});
  //
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Light.woff2', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Light.woff', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Light.ttf', {destDir: 'font/roboto'});
  //
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Regular.woff2', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Regular.woff', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Regular.ttf', {destDir: 'font/roboto'});
  //
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Medium.woff2', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Medium.woff', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Medium.ttf', {destDir: 'font/roboto'});
  //
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Bold.woff2', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Bold.woff', {destDir: 'font/roboto'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/roboto/Roboto-Bold.ttf', {destDir: 'font/roboto'});
  //
  //app.import(app.bowerDirectory + '/materialize/dist/font/material-design-icons/Material-Design-Icons.eot', {destDir: 'font/material-design-icons'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/material-design-icons/Material-Design-Icons.ttf', {destDir: 'font/material-design-icons'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/material-design-icons/Material-Design-Icons.svg', {destDir: 'font/material-design-icons'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/material-design-icons/Material-Design-Icons.woff', {destDir: 'font/material-design-icons'});
  //app.import(app.bowerDirectory + '/materialize/dist/font/material-design-icons/Material-Design-Icons.woff2', {destDir: 'font/material-design-icons'});
  //
  //app.import(app.bowerDirectory + '/materialize/dist/js/materialize.js');
  return app.toTree();
};
