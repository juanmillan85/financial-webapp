import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function() {
        var that = this;
        var filter = that.get('controller.timefilter');
        var filterFunction = function(filter) {
            $("#" + filter).addClass('selected').siblings().removeClass('selected');
        };
        if (filter) {
            filterFunction(filter);
        }

    }
});
