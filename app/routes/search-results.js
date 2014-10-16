import Ember from 'ember';

export default Ember.Route.extend({
 model: function (query) {
 	console.log("here");
    var self = this;
     var url="http://localhost:8080/news?q="+query.term+'&p=10&sortby=created_at&sortasc=true&tq=m&ntq=60';
//return Promise.all([,$.getJSON("http://developer.echonest.com/api/v4/song/search?api_key="+RocknrollcallYeoman.config.ECHO_NEST_API_KEY+"&format=json&results=10&bucket=id:7digital-US&bucket=audio_summary&bucket=song_hotttnesss&bucket=tracks&bucket=song_type", { title: query.term }) ]).then(function(jsonArray){

return new Ember.RSVP.Promise(function(resolve, reject) {
$.ajax({


  type: 'GET',

  // The URL to make the request to.
  url: url,

  contentType: 'application/json',

  crossDomain:true,
 	//headers: {'Access-Control-Allow-Origin': '*' } 	,
	beforeSend: function (request) {
                       // request.setRequestHeader("Access-Control-Allow-Origin", "*");
                       // request.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With");
    },
 	xhrFields: {
 	     withCredentials: false
 	  }


}).then(
          function(resp) { 
          	console.log("Succes");
          	resolve(resp) 
          },
          function(error) {
          	console.log("Error");
          	console.log(error);
           reject(error) 
       	  }
        );
    });
/*
    return new Ember.RSVP.Promise(function(resolve, reject) {
     
    $.ajax({
    type: 'GET',
    url: url,
    jsonpCallback: 'jsonCallback',
    contentType: 'application/json',
    //async: false,
    jsonCallback: function (data){
    	console.log(data);
    },
    dataType: 'jsonp',
    crossDomain:true,
 	headers: { 'Access-Control-Allow-Origin': '*',
 	'Access-Control-Request-Headers:': '*' },
 	xhrFields: {
 	     withCredentials: true
 	  }
 	})
      
	

    
        /*
      for (i = 0; i < artistResults.length; i++) {
        var entry = artistResults[i];
        artists.push(RocknrollcallYeoman.Artist.create({
          id: i + 1,
          type: 'artist',
          name: entry.name,
          hotttnesss: entry.hotttnesss,
          enid: entry.id
        }));
      }

      entry = null;

      for (i = 0; i < songResults.length; i++) {
        entry = songResults[i];
        songs.push(RocknrollcallYeoman.Song.create({
          id: i + 1,
          title: entry.title,
          enid: entry.id,
          type: 'song',
          artist_id: (entry.artist_id) ? entry.artist_id : null,
          artist_name: entry.artist_name,
          hotttnesss: entry.song_hotttnesss,
          audio_summary: entry.audio_summary
        }));
      }
      */
    
  }
});