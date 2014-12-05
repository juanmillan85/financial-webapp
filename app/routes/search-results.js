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
            refreshModel: false
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
        params.page="0";

        //if (!params.q) {
        //    return []; // no results
        //}
        this.searchQuery(params);
        //page 
        return params.page;



    },
    searchQuery: function(params) {
        params.q = params.q ? params.q : '';
        params.page = params.page ? params.page : 0;
        params.sortby = params.sortby ? params.sortby : 'created_at';
        params.sortasc = params.sortasc ? params.sortasc : true;
        params.tq = params.tq ? params.tq : 'd';
        params.ntq = params.ntq ? params.ntq : 30;
        params.cashtags = Ember.A([]);;
        var hashtags = [];
        if (params.q) {
            params.cashtags.pushObjects(twttr.txt.extractCashtags(params.q));
            hashtags = twttr.txt.extractHashtags(params.q);
            params.cashtags.pushObjects(hashtags);
        }

        var self = this;
        var url = "http://ambiecities.com:8079/news?q=" + params.q + '&p=' + params.page + '&sortby=' + params.sortby + '&sortasc=' + params.sortasc + '&tq=' + params.tq + '&ntq=' + params.ntq + '&tags=' + params.cashtags;

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
                Ember.run.scheduleOnce('afterRender', self, 'loadResults', resp);
                //load timeline chart
                if (params.page == "0")
                    Ember.run.scheduleOnce('afterRender', self, 'loadTimeline', resp);





            },
            function(error) {
                //send error event
            }
        );

    },

    afterModel: function(page, transition) {
        
        if (page=="0")
            window.scrollTo(0, 0);

    },
    loadResults: function(resp) {
        var results = resp.items;
        var items = Ember.A([]);
        if (this.controllerFor('searchResults').get('totalResults')) {
            items = this.controllerFor('searchResults').get('items');
        } else {
            var nResult = resp.numResults ? resp.numResults : 0;
            this.controllerFor('searchResults').set('totalResults', nResult);
        }

        //validate 0 results
        if (results) {
            //return items
            var i = 0,
                entry = null;
            for (i = 0; i < results.length; i++) {
                entry = results[i];
                var item = this.store.push('item', entry);
                items.pushObject(item);
            }
        }
        this.controllerFor('searchResults').set('items', items);


    },
    loadTimeline: function(resp) {
        var timeline = [];
        var query = this.controllerFor('searchResults').get('searchTerms');
        var facet = resp.timelineState.facets.timeline.facets;
        var groups = [];
        var data;
        var x = ['x'];
        var columns = [x];
        var j = 0;
        for (var i = 0; i < facet.length; i++) {
            var name = facet[i].field.trim();
            var index = groups.indexOf(name);

            if (index == -1) {
                j++;
                groups.push(name);
                columns.push([name]);
            }

            if (x.indexOf(Number(facet[i].value)) == -1) {
                x.push(Number(facet[i].value));
            }

            columns[j].push(facet[i].count);
            data = '{"value": ' + Number(facet[i].value) +
                ', "' + name + '": ' + facet[i].count + '}';

            timeline.push(JSON.parse(data));
        }

        var model = {
            //json: timeline,
            x: 'x',
            columns: columns,
            keys: {
                x: 'value',
                value: groups

            },

            type: 'area'


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
                    },
                   rotate: 60,
                multiline: true
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
    },

    actions: {
        loadMore: function(params) {
                   this.searchQuery(params);
        }
    }

});
