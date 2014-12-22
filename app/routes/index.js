import Ember from 'ember';

export default Ember.Route.extend({
	redirect: function() {
    this.transitionTo("/search?ntq=24&page=0&q=&timefilter=filter-twenty&tq=h");
  	}
});
