import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Component.extend({
    isFetching: false,
    beginInfinite: true,
    hasMoreContent: true,
    beginLength: 0,
    endLength: 1,
    limit: 20,

    classNames: ["infinite-scroller"],

    //hidden: computed.none('hasMoreContent', 'isFetching'),

    listenerDistance: 100,
    visibleContent: 'contextController.items',
    content: 'contextController.items',
    modelName: 'content.firstObject.constructor.typeKey',
    offsetFromTop: null,
    documentHeight: 0,
    beforeLength: 0,

    listenForOffset: (function() {
        this.set('hasMoreContent', true);
    }).observes('offsetFromTop'),

    listenForDistance: function() {
        var self = this;
        if (this.get('beginInfinite')) {
            Ember.$(window).on('scroll.infinite-scroll', function() {
                Ember.run(function() {
                    var offsetFromTop = self.$().offset().top;
                    var documentHeight = Ember.$(document).height();
                    var isDistanceFromBottom = (offsetFromTop - $(window).scrollTop() - Ember.$(window).height());
                    isDistanceFromBottom = isDistanceFromBottom <= self.get('listenerDistance');
                    self.setProperties({
                        isDistanceFromBottom: isDistanceFromBottom,
                        offsetFromTop: offsetFromTop,
                        documentHeight: documentHeight
                    });
                });
            });
        }
    }.observes('beginInfinite', 'listenerDistance').on('init'),

    infiniteScroll: function() {
        if (this.get('isDistanceFromBottom') && this.get('beginInfinite') && this.get('hasMoreContent')) {
            Ember.run.debounce(this, function() {
                this.fetchMore();
            }, 200);
        }
    }.observes('isDistanceFromBottom', 'documentHeight'),

    fetchMore: function() {
        var self = this;
        if (this.get('isFetching')) {
            return;
        }

        this.set('isFetching', true);
      

        var route = this.get('controllers.search-results.taget');


        this.triggerAction({
            action: 'loadMore',
            target: this.get('controllers.search-results')
        });

        Ember.run.later(self, function() {
            self.set('isFetching', false);
          
        },2500);
        /*this.get('contextController.store').find(query.model, query.params).then(function (stuff) {
          var returnedContentLength = stuff.get('length');
         
          if(query.callback){
            query.callback(stuff);
          } else {
            self.get('content').addObjects(stuff);
          }
          */
       
        /*
   
  */


    },


    willDestroyElement: function() {
        Ember.$(window).off('scroll.infinite-scroll');
    }
});
