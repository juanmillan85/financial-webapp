import Ember from 'ember';

export default Ember.View.extend({

    tagName: 'div',
    classNames: ['item thumbnail section'],
    //thumbnail section
    //span3 item world scenery isotope-item
    // classNameBindings: 'isSelected',
    templateName: 'item'
});
