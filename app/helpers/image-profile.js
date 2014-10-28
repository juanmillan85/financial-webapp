import Ember from 'ember';

function imageProfile(item) {
    if (item != null) {
        var urlUser = 'http://twitter.com/' + item.get('authorScreenName');
        var profile_image = "<a href='" + urlUser + "' target='_blank' class='pull-left'>";
        profile_image += "<img class='img-item-header  img-responsive img-thumbnail' src='" + item.get('avatarImage') + "''>";
        profile_image += "</a>";
        return new Handlebars.SafeString(profile_image);
    }
}

export {
    imageProfile
};

export default Ember.Handlebars.makeBoundHelper(imageProfile);
