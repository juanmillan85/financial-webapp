import Ember from 'ember';

function headerItem(item) {
    if (item != null) {
        var urlUser = 'http://twitter.com/' + item.get('authorScreenName');
        var header = "<a href='" + urlUser + "' target='_blank'>@" + item.get('authorScreenName') + "</a>";
        return new Handlebars.SafeString(header);
    }
}

export {
    headerItem
};

export default Ember.Handlebars.makeBoundHelper(headerItem);
