import Ember from 'ember';

export default Ember.Route.extend({
      activate: function() {
      this._super();
      window.scrollTo(0, 0);
  },
    model: function(query) {
        var self = this;
        var url = "http://ambiecities.com:8079/news?q=" + query.term + '&p=10&sortby=created_at&sortasc=true&tq=h&ntq=60';
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
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
                    resolve(resp);
                },
                function(error) {
                    reject(resp);
                }
            );
        });
        return promise.then(function(resp) {
            console.log(resp);
            var results = resp.items;
            var items = [],
                i = 0,
                entry = null;
            for (i = 0; i < results.length; i++) {
                entry = results[i];
                var item = self.store.push('item', entry);
                items.push(item);
            }
            return {
                items: items
            }
        }, function(resp) {
            console.log(resp);
        });
    }

});
