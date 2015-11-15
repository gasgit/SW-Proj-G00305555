var express = require('express');

var PouchDB = require('pouchdb');

var app = express();

var db_stops_local = new PouchDB('stopsdb');
var db_ors_local = new PouchDB('orsdb');

//PouchDB.sync(db_stops_local, "http://127.0.0.1:5984/stops");
//PouchDB.sync(db_ors_local, "http://127.0.0.1:5984/testy5");
//test git

// function to call for sync with couchDB-server
function syncWithCouchDB(){

	PouchDB.sync(db_stops_local, "http://127.0.0.1:5984/stops");
}
// call on startup
syncWithCouchDB();


///////////////////////////////////////////////////////////////////////////////////////////

// root endpoint

////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', function(req, res) {
	res.send("Outdoor Recreational Strategy api.");
});


/////////////////////////////////////////////////////////////////////////////////////////////

// getall stops and show docs

/////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/stops', function(req, res) {

	db_stops_local.allDocs({
		include_docs: true,
		descending: false
	}, function(err, doc) {

		res.send(err || doc)

	});
});

/////////////////////////////stops search term///////////////////////////////////////////////

// stops search term - still needs work

/////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/stops/search', function(req, res) {

	var searchstop = req.query.searchterm
	console.log(searchstop);

	db_stops_local.query(function(doc, emit) {

		if (doc.properties.stop_name.indexOf(searchstop) != -1  ||
		   		doc.properties.stop_name.toLowerCase().indexOf(searchstop) != -1)
			 			emit(doc.properties.stop_name, {
				 				"coordinates": [doc.geometry.coordinates]
	});

	}).then(function(result) {

		res.send(result);

	}).catch(function(err) {
		console.log(err);
	});
});


///////////////////////////////////////////////////////////////////////

// GET - need work here on query

////////////////////////////////////////////////////////////////////////
app.get('/api/stops/findOne/',function(req,res){

	//var findOne = req.query.findOne

	db_stops_local.get('999344546' , function(err, doc) {
  if (err) { return console.log(err); }
  	res.send(doc);
});
})

///////////////////////////////////////////////////////////////////////

// PUT

////////////////////////////////////////////////////////////////////////

app.get('/api/stop/put/*', function(req, res) {


		
	var array = {"_id": req.query._id, "stop_id": req.query.stop_id, "stop_lat": req.query.stop_lat, "stop_lon": req.query.stop_lon};	
		
	//var array = {"_id": "64646464","stop_id":"5222","stop_name":"Emmerson Street","stop_lat":22222,"stop_lon":222222};

//	db_stops_local.put({
//		_id: '98345',
//		stop_id: '666',
//		stop_name: 'Emmerson Ave',
//		stop_lat: '111111111',
//		stop_lon: '1111111'

//	})


	db_stops_local.put(array)
	
	
	.then(function(response) {
		res.send(response);
		console.log("sorted");
	}).catch(function(err) {
		res.send(err);
		console.log(err);
	});
	
	syncWithCouchDB();

	//curl -X PUT 'http://127.0.0.1:5984/stops/12345' -H 'Content-Type:application/json' -d '{"stop_id":"5222","stop_name":"Emmerson Street","stop_lat":22222,"stop_lon":222222}'

	//curl -X PUT 'http://127.0.0.1:8000/db_stops_local/12345888' -H 'Content-Type:application/json' -d '{"stop_id":"88888","stop_name":"Emmerson Road","stop_lat":99999,"stop_lon":66666}'



})


///////////////////////////////////////////////////////////////////////

// DELETE

////////////////////////////////////////////////////////////////////////

console.log("Server running on 127.0.0.1:8000")
var server = app.listen(8000);
