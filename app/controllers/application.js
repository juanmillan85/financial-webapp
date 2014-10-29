import Ember from 'ember';

export default Ember.ObjectController.extend({
searchTerms: '',
  
  actions: {
    submit: function() {
    	

      this.transitionToRoute('search-results',this.get('searchTerms'));
     
    }
  }
});