import Ember from 'ember';


export default Ember.View.extend({
    draw: function() {

    }.on('didInsertElement'),
    didInsertElement: function() {
        
        this.$('#menuToggle, .menu-close').on('click', function() {
            $('#menuToggle').toggleClass('hide');
            $('body').toggleClass('body-push-toleft');
            $('#theMenu').toggleClass('menu-open');
        });
        this.$('#bottomNav').headroom({
            "offset": 0,
            "tolerance": 0,
            "classes": {
                "initial": "slide",
                "pinned": "slideUp",
                "unpinned": "slideReset"
            }
        });
        this.$('#bottomNav').headroom("destroy");

        this.$('#bottomNav a').click(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
        });

        
    }
});
