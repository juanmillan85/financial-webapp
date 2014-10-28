import Ember from 'ember';

function parseItem(text) {
    if (text === null || text === undefined) {
        text = "";
    }
    var parsed = twttr.txt.autoLink(text, {
        target: '_blank'
    });

    return new Handlebars.SafeString(parsed);
}

export {
    parseItem
};

export default Ember.Handlebars.makeBoundHelper(parseItem);
