import Ember from 'ember';

export default Ember.Route.extend({
    activate: function() {
        this._super();
        window.scrollTo(0, 0);
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


        console.log(params);
        var p, q, sortby, sortasc, tq, ntq;
        if (!params.q) {
            return []; // no results;
        }
        q = params.q ? params.q : 'news';
        p = params.page ? params.page : 10;
        sortby = params.sortby ? params.sortby : 'created_at';
        sortasc = params.sortasc ? params.sortasc : true;
        tq = params.tq ? params.tq : 'd';
        ntq = params.ntq ? params.ntq : 30;




        var url = "http://localhost:8079/news?q=" + q + '&p=' + p + '&sortby=' + sortby + '&sortasc=' + sortasc + '&tq=' + tq + '&ntq=' + ntq;


        return new Ember.RSVP.Promise(function(resolve, reject) {
            $.ajax({
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

                    //console.log(resp);
                    var results = resp.items;
                    //return items
                    var items = [],
                        i = 0,
                        entry = null;
                    for (i = 0; i < results.length; i++) {
                        entry = results[i];
                        var item = self.store.push('item', entry);
                        items.push(item);
                    }
                    resolve({
                        items: items,totalResults:resp.numResults
                    });

                },
                function(error) {
                    reject(resp);
                }
            );
        });


    }


});
