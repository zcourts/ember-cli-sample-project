import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

$(document).ajaxError(function (e, req) {
  if (req.status === 401) {
    window.location = '/auth';
  }
});

Ember.Application.initializer({
  name: "user",

  initialize: function (container, application) {
    //var adapter = container.lookup('adapter:application');
    //var store = container.lookup('store:main');
    var translatorService = container.lookup('translateService:main');

    window.translatorService = translatorService;
    Ember.Handlebars.registerBoundHelper('t', function (key, options) {
      console.log(key, options);
      return new Ember.Handlebars.SafeString(translatorService.translateKey({
        key: key,
        pluralKey: undefined,
        pluralCount: undefined,
        parameters: options.hash
      }));
    });

    // Wait until all of the following promises are resolved
    application.deferReadiness();

    container.lookup('store:main').find('user', 'current').then(function (user) {
      // Register the `user:current` namespace
      container.register('user:current', user, {instantiate: false, singleton: true});

      // Inject the namespace into controllers and routes
      container.injection('route', 'user', 'user:current');
      container.injection('controller', 'user', 'user:current');
      // Continue the Application boot process, allowing other Initializers to run, AFTER loading translations
      $.getJSON("/translation.json", function (data) {
        translatorService.setDictionary(Ember.Object.create(data));
        application.advanceReadiness();
      });
    });
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
