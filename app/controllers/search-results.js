import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: "application",
    searchTermsBinding: 'controllers.application.searchTerms',
    items:null,
    totalResults:null,
    applicationName: function() {
        var st = this.get('searchTerms');
        if (st) {
            return st + "???";
        } else {
            return "Financial Life";
        }
    }.property('searchTerms'),
    queryChange:function(){
        if(!this.get('searchTerms'))
        this.set('searchTerms',this.get('q'));
    }.observes('q'),
    artistsIsChecked: true,
    songsIsChecked: true,
    queryParams: ['q', 'page', 'sortby', 'tq', 'ntq','timefilter'],
    //query
    q: null,
    //page size
    page: null,
    sortby: null,
    //timequery
    tq: null,
    //number timequery
    ntq: null,
    //timefilter
    timefilter:null,
    //total results after searching
    
    actions: {

        viewedTweet: function(model) {

            var date = Date.now();

            /*var activity = this.store.createRecord('activity', {
        display_id: model.enid,
        type: model.type,
        display_name: model.name,
        hotttnesss: model.hotttnesss,
        timestamp: date
      });

      activity.save();
  */
            this.transitionToRoute('item', model.enid);
        },

        viewedSong: function(model) {

            /* var date = Date.now();

             var activity = this.store.createRecord('activity', {
               display_id: model.enid,
               type: model.type,
               display_name: model.artist_name,
               hotttnesss: model.hotttnesss,
               timestamp: date
             });

             activity.save();

             this.transitionToRoute('song', model.enid);
             */
        }
    }
});
