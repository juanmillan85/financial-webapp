import DS from 'ember-data';
var attr = DS.attr;
export default DS.Model.extend({

    reference: attr(),
    streamId: attr(),
    title: attr(),
    tags: attr(),
    uid: attr(),
    timelineUser: attr(),
    mentions: attr(),
    inReply: attr(),
    referencedUserId: attr(),
    links: attr(),
    entities: attr(),
    url: attr(),
    publicationTime: attr(),
    insertionTime: attr(),
    text: attr(),
    sentiment: attr(),
    lang: attr(),
    original: attr(),
    likes: attr(),
    shares: attr(),
    authorFullName: attr(),
    authorScreenName: attr(),
    followersCount: attr(),
    friendsCount: attr(),
    avatarImage: attr(),
    avatarImageSmall: attr(),
    score: attr(),
    latitude: attr(),
    longitude: attr(),
    locationName: attr(),
    countryName: attr(),
    userId: attr(),
    publicationDate: function(){
        var date=new Date(this.get('publicationTime'));
        return  date;
    }.property('publicationTime')
});


/**

}

*/
