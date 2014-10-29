import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FinancialWebappENV.locationType
});

Router.map(function() {
   this.route('search-results', {
    path: 'search/'
  });
});

export default Router;
