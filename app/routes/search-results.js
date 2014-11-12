import Ember from 'ember';
import ajax from 'ic-ajax';
export default Ember.Route.extend({
    activate: function() {
        this._super();

    },
    queryParams: {
        q: {
            refreshModel: true
        },
        page: {
            refreshModel: true
        },
        sortby: {
            refreshModel: true
        },
        tq: {
            refreshModel: true
        },
        ntq: {
            refreshModel: true
        }
    },
    model: function(params) {
        var self = this;
        self.controllerFor('searchResults').set('totalResults', null);

        console.log(params);
        var p, q, sortby, sortasc, tq, ntq;
        if (!params.q) {
            return []; // no results;
        }
        q = params.q ? params.q : '';
        p = params.page ? params.page : 0;
        sortby = params.sortby ? params.sortby : 'created_at';
        sortasc = params.sortasc ? params.sortasc : true;
        tq = params.tq ? params.tq : 'd';
        ntq = params.ntq ? params.ntq : 30;




        var url = "http://ambiecities.com:8079/news?q=" + q + '&p=' + p + '&sortby=' + sortby + '&sortasc=' + sortasc + '&tq=' + tq + '&ntq=' + ntq;

        q = q != "" ? q : "Number of Tweets";
        ajax({
            type: 'GET',
            // The URL to make the request to.
            url: url,
            contentType: 'application/json',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            }
        }).then(
            function(resp) {

                //load list of results
                Ember.run.scheduleOnce('afterRender', self, 'loadResults',resp);
                //load timeline chart
               Ember.run.scheduleOnce('afterRender', self, 'loadTimeline',resp);

               



            },
            function(error) {
                //send error event
            }
        );
        //page 
        return p;



    },

    afterModel: function(page, transition) {
        console.log(transition);
        if (!page)
            window.scrollTo(0, 0);

    },
    loadResults: function(resp){
        var results = resp.items;
                //return items
                var items = [],
                    i = 0,
                    entry = null;
                for (i = 0; i < results.length; i++) {
                    entry = results[i];
                    var item = this.store.push('item', entry);
                    items.push(item);
                }
                var nResult=resp.numResults?resp.numResults:0;
                this.controllerFor('searchResults').set('items', items);
                this.controllerFor('searchResults').set('totalResults', nResult);
    },
    loadTimeline: function(resp){
         var timeline = [];
                var query = this.controllerFor('searchResults').get('searchTerms');
                var facet = resp.timelineState.facets.timeline.facets;
                for (var i = 0; i < facet.length; i++) {

                    timeline.push({
                        value: Number(facet[i].value),
                        count: facet[i].count
                    });
                }

                var model = {
                    json: timeline,
                    keys: {
                        x: 'value',
                        value: ['count']
                    },
                    names: {
                        count: query
                    },
                    type: 'area',

                    types: {
                        count: 'area'
                    }
                };

                var axis = {

                    x: {
                        type: 'timeseries',
                        tick: {

                            format: function(x) {

                                // + to convert to Number

                                var now = window.moment();
                                var date = window.moment(+x);
                                var formatDate = date.from(now);
                                //var formatDate = window.moment(+x).fromNow(true);//window.moment(+x).format('YYYY-MM-DDTHH');
                                return formatDate;
                            }


                        }
                    },
                    y: {
                        label: {
                            text: '# Mentions',
                            position: 'outer-middle'
              
                        }
                    }

                };

                this.controllerFor('searchResults').set('timelineModel', model);
                this.controllerFor('searchResults').set('timelineAxis', axis);
    }

});
