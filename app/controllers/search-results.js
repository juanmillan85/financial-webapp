import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: "application",
    searchTermsBinding: 'controllers.application.searchTerms',
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
    q: null,
    page: null,
    sortby: null,
    tq: null,
    ntq: null,
    timefilter:null,
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
