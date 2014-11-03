import Ember from 'ember';

export default Ember.ObjectController.extend({
searchTerms: '',

  actions: {
    submit: function() {
    var query=this.get('searchTerms');

      this.transitionToRoute('search-results',{queryParams: {q: query}});

    },
    filterHour:function(){
    	var query=this.get('searchTerms');
    	this.transitionToRoute('search-results',{queryParams: {q: query,p:0,tq:'m' ,ntq:60 ,timefilter:'filter-hour'}});
    },
    filterSixHours:function(){
    	var query=this.get('searchTerms');
    	this.transitionToRoute('search-results',{queryParams: {q: query,p:0,tq:'h' ,ntq:6 ,timefilter:'filter-six'}});

    },
    filterDay:function(){
    	var query=this.get('searchTerms');
    	this.transitionToRoute('search-results',{queryParams: {q: query,p:0,tq:'h' ,ntq:24 ,timefilter:'filter-twenty'}});

    },
    filterWeek:function(){
    	var query=this.get('searchTerms');
    	this.transitionToRoute('search-results',{queryParams: {q: query,p:0,tq:'d' ,ntq:7 ,timefilter:'filter-week'}});
   
    },
    filterMonth:function(){
var query=this.get('searchTerms');
    	this.transitionToRoute('search-results',{queryParams: {q: query,p:0,tq:'d' ,ntq:30 ,timefilter:'filter-month'}});
   
    }

    
  }
});