var express = require('express');

var PouchDB = require('pouchdb');

var app = express();
var db_4all_local = new PouchDB('db_4all_local');

//////////////////////////////////////////////////////////////////////////////////////////////////////

// my functions 

//////////////////////////////////////////////////////////////////////////////////////////////////////


// sync with couchDB
function syncWithCouchDB() {

    PouchDB.sync(db_4all_local, "http://127.0.0.1:5984/orsdb");

}

//syncWithCouchDB();
// debug info
PouchDB.debug.enable('*');

var start
// start timing
function start(){

	start = Date.now();
}
// finish timing
function stop(){
	
	console.log("Query returned in " + (Date.now() - start) + " milliseconds");
}
// display db info in console on script startup
function info(){

	db_4all_local.info().then(function (result) {
	  console.log(result);
	}).catch(function (err) {
	  console.log(err);
	});

}

info();



////////////////////////////  root endpoint /////////////////////////////////////

app.get('/', function (req, res) {
    res.send("This is the Outdoor Recreational Strategy api.");
});


/////////////////////////////stops search term////////////////////////////////////

// bus stops search term

////////////////////////////////////////////////////////////////////////////////

app.get('/api/stops/search/', function (req, res) {


    var searchterm = req.query.searchterm
    var searchstop = searchterm.toLowerCase();

    db_4all_local.query(function (doc, emit) {

        if (doc._id && doc.properties.stop_name)

            if (doc.properties.stop_name.toLowerCase().indexOf(searchstop) != -1) {

                emit({
                    "Stop Type": doc.type,
                    "Stop Name": doc.properties.stop_name,
                    "Coordinates: ": doc.geometry.coordinates
                })
            }

    }).then(function (result) {

        res.send(result);


    }).catch(function (err) {
        console.log(err);
    });
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/stops', function (req, res) {

    db_4all_local.allDocs({
        include_docs: true,
        descending: false
    }, function (err, doc) {

        res.send(err || doc)

    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/stops/delete/', function (req, res) {

    var id = req.query.id

    console.log(id);


    db_4all_local.get(id).then(function (doc) {

        return db.remove(doc);
    });


    syncWithCouchDB();

    res.send("done");

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/get/one/', function (req, res) {

    db_4all_local.query(function (doc, emit) {
        if (doc._id === 'd8c69cc0157924c5507e4c9d750c45a6') {
            emit(doc);
            console.log(doc);
            res.send(doc);


        }
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/get/doc/', function (req, res) {

    var docid = req.params.docid

    db_4all_local.get(docid).then(function (doc) {
        res.send(doc);
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    });

//var docid = req.query.docid

//db_4all_local.query(function(doc, emit) {
//	if(doc._id)
//	  if (doc._id === docid) {
//		emit(doc);
//		console.log(doc);
//		res.send(doc);
//	  

//	}
//})
//console.log(docid)
//db_4all_local.query(function(doc, emit) {
//	if(doc._id)
//  if (doc._id === docid) {
//    emit(doc);
//    
//  }
//}).then(function (result) {
//  res.send(result);
//}).catch(function (err) {
//  console.log(err);
//});


})


////db_4all_local.query(function(doc, emit) {
////  if (doc._id === 'd8c69cc0157924c5507e4c9d750c45a6') 
////    emit(doc);
////    console.log(doc);
////    //res.send(doc);
////  
////}
////});
////})


//


///////////////////////////////  put new stop  to db_stops_local ///////////////////////////////////


app.get('/api/stop/put/*', function (req, res) {

// http://127.0.0.1:8000/api/stop/put/?_id=66444344546&stop_id=6688866&stop_lat=53.123456&stop_lon=update

    var array = {
        "_id": req.query._id,
        "stop_id": req.query.stop_id,
        "stop_lat": req.query.stop_lat,
        "stop_lon": req.query.stop_lon
    };

    //var array = {"_id": "64646464","stop_id":"5222","stop_name":"Emmerson Street","stop_lat":22222,"stop_lon":222222};

//	db_stops_local.put({
//		_id: '98345',
//		stop_id: '666',
//		stop_name: 'Emmerson Ave',
//		stop_lat: '111111111',
//		stop_lon: '1111111'

//	})


    db_4all_local.put(array)


        .then(function (response) {
            res.send(response);
            console.log("sorted");
        }).catch(function (err) {
            res.send(err);
            console.log(err);
        });

    syncWithCouchDB();

    //curl -X PUT 'http://127.0.0.1:5984/stops/12345' -H 'Content-Type:application/json' -d '{"stop_id":"5222","stop_name":"Emmerson Street","stop_lat":22222,"stop_lon":222222}'

    //curl -X PUT 'http://127.0.0.1:8000/db_stops_local/12345888' -H 'Content-Type:application/json' -d '{"stop_id":"88888","stop_name":"Emmerson Road","stop_lat":99999,"stop_lon":66666}'


})

//////////////////////////////  delete stop from db_stops_local   //////////////////////////////////


//////////////////////////////  all activities ////////////////////////////////////

app.get('/api/activities', function(req, res) {
	begin();
	var map = function(doc) {
		if (doc.type === "Ors")

		emit(doc.properties.name, {"Name": doc.properties.name, 
		"FID": doc.properties.FID, "Ref": doc.properties.Ref,
		 "Description": doc.properties.descriptio, 
		 "Email": doc.properties.Email,"Web":doc.properties.Web,
		  "Phone": doc.properties.Phone});

	}

	db_4all_local.query({
		map: map
	}, function(err, response) {

		res.send(err || response);
		end();
		
	})
})


/////////////////////////////   search activities  ///////////////////////////////


app.get('/api/activities/search/', function(req, res) {
	begin();
	var searchterm = req.query.searchterm
	var searchactivity = searchterm.toLowerCase();

	db_4all_local.query(function(doc, emit) {
	
		if(doc.type == 'Ors' && doc.properties.descriptio)

		if (doc.properties.descriptio.toLowerCase().indexOf(searchactivity) != -1)
				emit(doc.properties.name, {
					"desc": doc.properties.descriptio,
						"coordinates": doc.geometry.coordinates
		});
					
	}).then(function(result) {

		res.send(result);
		end();
		//console.log(result);

	}).catch(function(err) {
		console.log(err);
	});	
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/activities/search/name/', function(req, res) {

	var searchterm = req.query.searchterm
	var searchname = searchterm.toLowerCase();

	db_4all_local.query(function(doc, emit) {
	
		if(doc.type == 'Ors' && doc.properties.name )

			if (doc.properties.name.toLowerCase()
				.indexOf(searchname) != -1)
					emit(doc.properties.name, {
						"desc": doc.properties.descriptio,
							"coordinates": doc.geometry.coordinates
		});				
	}).then(function(result) {

		res.send(result);
		//console.log(result);

	}).catch(function(err) {
		console.log(err);
	});
	
	
	
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// trains_local

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/trains', function (req, res) {
	start();
    db_4all_local.allDocs({
        include_docs: true,
        descending: false
    }, function (err, doc) {

        res.send(err || doc)
        stop();

    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// search trains by stop name

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/trains/search/', function(req, res) {
	start();
	var searchterm = req.query.searchterm
	var searchtrain = searchterm.toLowerCase();


	db_4all_local.query(function(doc, emit) {
	
	if(doc.type == 'Train')

		if (doc.properties.stop_name.toLowerCase().indexOf(searchtrain) != -1)
			 			emit(doc.properties.stop_name, {
				 				"coordinates": [doc.geometry.coordinates]
	});

	}).then(function(result) {

		res.send(result);
		stop();

	}).catch(function(err) {
		console.log(err);
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// search both bus and trains

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/search/', function (req, res) {

    var searchterm = req.query.searchterm
    var searchstop = searchterm.toLowerCase();

    db_4all_local.query(function (doc, emit) {

        if (doc._id && doc.properties.stop_name)

            if (doc.properties.stop_name.toLowerCase().indexOf(searchstop) != -1) {

                emit({
                    "Stop Type": doc.type,
                    "Stop Name": doc.properties.stop_name,
                    "Coordinates: ": doc.geometry.coordinates
                })
            }

    }).then(function (result) {

        res.send(result);
        console.log(result);

    }).catch(function (err) {
        console.log(err);
    });
})


console.log("Server running on 127.0.0.1:8000")
var server = app.listen(8000);
