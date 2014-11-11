import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix: 'financial-webapp', // TODO: loaded via config
    Resolver: Resolver
});

loadInitializers(App, 'financial-webapp');
window.moment.relativeTimeThreshold('s', 59);
window.moment.relativeTimeThreshold('m', 59);
window.moment.relativeTimeThreshold('h', 23);
window.moment.relativeTimeThreshold('d', 28);
window.moment.relativeTimeThreshold('M', 11);
export default App;
