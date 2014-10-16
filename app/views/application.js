import Ember from 'ember';


export default Ember.View.extend({
  draw: function() {
   
  }.on('didInsertElement'),
  didInsertElement: function(){
  		this.$('#menuToggle, .menu-close').on('click', function(){
				$('#menuToggle').toggleClass('active');
				$('body').toggleClass('body-push-toleft');
				$('#theMenu').toggleClass('menu-open');
			});
  		this.$('#bottomNav a').click(function() {
    		$(this).addClass('selected').siblings().removeClass('selected');
		});
  }
});