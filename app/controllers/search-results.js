import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: "application",
    searchTermsBinding: 'controllers.application.searchTerms',
    items: {},
    searching: true,
    //cacheQuery: false,
    totalResults: null,
    timelineModel: {},
    timelineAxis: {},
    didItemsChange: function() {
        var items = this.get('items');
    }.observes('items.length'),
    applicationName: function() {
        var st = this.get('searchTerms');
        if (st) {
            return st ;
        } else {
            return "Financial Life";
        }
    }.property('searchTerms'),
    queryChange: function() {
        if (!this.get('searchTerms'))
            this.set('searchTerms', this.get('q'));
    }.observes('q'),
    isSearching: function() {
        var numResults = this.get('totalResults');
        this.set('searching', numResults == null);
        if (!this.get('searching'))
            this.set('page', 0);

    }.observes('totalResults'),
    formatTimeFilter: function() {
        var timefilter = this.get('timefilter');
        switch (timefilter) {
            case "filter-hour":
                return "the last hour"
                break;
            case "filter-six":
                return "the last 6 hours"
                break;
            case "filter-twenty":
                return "the last 24 hours"
                break;
            case "filter-week":
                return "the last week"
                break;

            default:
                return "the last month"
        }
    }.property('timefilter'),
    artistsIsChecked: true,
    songsIsChecked: true,
    queryParams: ['q', 'page', 'sortby', 'tq', 'ntq', 'timefilter'],
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
    timefilter: null,
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
        },
        loadMore: function(todo) {
            var page = +this.get('page');

            this.set('page', ++page);
            var query = this.get('queryParams');
            var q = this.get('q');
            var page = this.get('page');
            var tq = this.get('tq');
            var ntq = this.get('ntq');
            var timefilter = this.get('timefilter');

            this.get('target').send('loadMore', {
                q: q,
                page: page,
                tq: tq,
                ntq: ntq,
                timefilter: timefilter
            });

            // this.transitionTo({queryParams: {direction: 'asc'}});
            //this.transitionToRoute('search-results', query);
        }
    },

});
