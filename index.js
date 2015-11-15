var express = require('express');

var PouchDB = require('pouchdb');

var app = express();

var db_stops_local = new PouchDB('stopsdb');
var db_ors_local = new PouchDB('orsdb');

//PouchDB.sync(db_stops_local, "http://127.0.0.1:5984/stops");
//PouchDB.sync(db_ors_local, "http://127.0.0.1:5984/testy5");
//test git



// Create a HTTP server app.
app.get('/', function(req, res) {
	res.send("Outdoor Recreational Strategy api.");
});


app.get('/api/stops', function(req, res) {

	db_stops.allDocs({
		include_docs: true,
		descending: false
	}, function(err, doc) {
		var stopsArray = [];

		for (var i = 0; i < doc.rows.length; i++) {
			stopsArray.push(doc.rows[i]);
		}

		for (var i = 0; i < stopsArray.length; i++) {
			console.log(i + " Stops:- " + stopsArray[i].doc.stop_name);
		}

		res.send(stopsArray)

	});
});


///////////////////////////////////////////////////////////////////////

// GET

////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////

// PUT

////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////

// DELETE

////////////////////////////////////////////////////////////////////////

console.log("Server running on 127.0.0.1:8000")
var server = app.listen(8000);
