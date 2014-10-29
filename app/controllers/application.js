import Ember from 'ember';

export default Ember.ObjectController.extend({
searchTerms: '',

  actions: {
    submit: function() {
    var query=this.get('searchTerms');

      this.transitionToRoute('search-results',{queryParams: {q: query}});

    }
  }
});