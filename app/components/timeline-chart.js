import Ember from 'ember';

export default Ember.Component.extend({
    /**
      Element tag name
      */
    tagName: 'div',
    /**
    Element classes
    */
    classNames: ['c3-chart-component'],
    /**
    Query Cache
    */
    dataCache: undefined,
    /**
    Current Query
    */

    /**
    The data to display
    */
    data: {},

    /**
    Axis specifications
    */
    axis: {},

    /**
    Region specifications
    */
    regions: {},

    /*
    Type of chart
    */
    bar: {},
    pie: {},
    donut: {},
    gauge: {},

    /**
    Grid lines
    */
    grid: {},

    /**
    Legend
    */
    legend: {},

    /**
    Tooltip
    */
    tooltip: {},

    /**
    Subchart
    */
    subchart: {},

    /**
    Zoom
    */
    zoom: {},

    /**
    Size
    */
    size: {},

    /**
    Padding
    */
    padding: {},

    /**
    Color
    */
    color: {},


    /**
    Transition
    */
    transition: {},

    /**
     */
    _chart: undefined,
    dataNamesDidChange: function() {
        var data = this.get('data');
        var dataCache = this.get('dataCache');
        var names = data.names.count;
        var dataNames = dataCache ? dataCache.names.count : undefined;
        var result=!(names == dataNames)
        console.log(names);
        console.log(dataNames);
        return result;
    },

    /**
    The Chart
    */
    chart: function() {
        var self = this;
        //self.get('intialize')
        // query doesnt change

        //if (Ember.isEqual(self.get('_chart'), undefined)) {
        if (Ember.isEqual(self.get('_chart'), undefined) || self.dataNamesDidChange()) {
            // Empty, create it.
            var container = self.get('element');
            if (Ember.isEqual(container, undefined)) {
                return undefined;
            } else {
                //change query cache
                var data = self.get('data');
                self.set('dataCache', data);

                var config = self.get('_config');
                var chart = c3.generate(config);
                self.set('_chart', chart);
              
                return chart;
            }
        } else {
            // Editor is already created and cached.
            return self.get('_chart');
        }
    }.property('element', '_config', 'data'),

    /**
     */
    _config: function() {
        var self = this;
        var c = self.getProperties([
            'data',
            'axis',
            'regions',
            'bar',
            'pie',
            'donut',
            'gauge',
            'grid',
            'legend',
            'tooltip',
            'subchart',
            'zoom',
            'size',
            'padding',
            'color',
            'transition'
        ]);
        c.bindto = self.get('element');
        return c;
    }.property('element',
        'data',
        'axis',
        'regions',
        'bar',
        'pie',
        'donut',
        'gauge',
        'grid',
        'legend',
        'tooltip',
        'subchart',
        'zoom',
        'size',
        'padding',
        'color',
        'transition'),

    /**
    Data Observer
    */
    dataDidChange: function() {
        var self = this;
        var chart = self.get('chart');
        chart.load(self.get('data'));
    }.observes('data').on('didInsertElement')

});
