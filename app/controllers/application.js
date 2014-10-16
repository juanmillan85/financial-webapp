import Ember from 'ember';

export default Ember.ObjectController.extend({
searchTerms: '',
  applicationName: function() {
  	console.log("jjee");
    var st = this.get('searchTerms');
    if (st) {
      return st + "???";
    } else {
      return "Financial Life";
    }
  }.property('searchTerms'),
  actions: {
    submit: function() {
    	

      this.transitionToRoute('search-results',this.get('searchTerms'));
     
    }
  }
});