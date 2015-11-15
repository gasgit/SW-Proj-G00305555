

# SW-G00305555


Glen Gardiner 

The purpose of the project is to use a collection of Public Transport and The Outdoor Recreation Strategy datasets to build an API to find and determine if the locations are accessible using public transport(Bus_Eireann).

##Tools and Methods

Nodejs and Express to create the server to handle the HTTP, GET, POST, PUT and DELETE requests/responses.
Databases to store datasets to allow for query, update , delete funtionality.All responses will return in json format in the browser or Curl in the console for development and if possible a front end to demo. 




## Datasets include

###DS 1
The Outdoor Recreation Strategy Mapping for West Regional Authority.This dataset includes Galway, Mayo and Roscommon at various locations and wide range of outdoor activities. 
[Outdoor Recreation Strategy](https://data.gov.ie/dataset/outdoor-recreation-strategy).

Dataset formats include csv, geojson.


###DS 2
The public transport dataset I will use is Bus Eireann which is the most inclusive for the region and is free to download from [Public Transport](http://www.transportforireland.ie/transitData/PT_Data.html). As the project proceeds there are other options to include if nessary.

Dataset is in text format.

###DS 3
Other datasets may include Blueflag beaches..

## Databases Used

CouchDB-server used to create dbs stops and ors.
PouchDb on express for db_stops_local and db_ors_local which sync with couchDB-server




## cURL

The curl commands used to load couchDb-server on localhost

test couch-server is running
curl http://127.0.0.1:5984/

get all dbs listed on couchDb-server
curl -X GET http://127.0.0.1:5984/_all_dbs

create db on couchDB-server
curl -X PUT http://127.0.0.1:5984/stops

delete db from couchDB-server
curl -X DELETE http://127.0.0.1:5984/stops

load db from file to couchDB-server.. cd into folder containing json file to post.
curl -d @stop_times.json -H "Content-type: application/json" _id -X POST http://127.0.0.1:5984/stops/_bulk_docs



## How to Query the API

Tested using cURL, Postman and web-browser.



## Example use of the API

```
// Root endpoint to Express app
app.get('/', function(req,res){});

```

```
// List all bus stops from db_stops_local synced with stops db on couchDB-server
app.get('/api/stops', function(req,res){});

```

```

// Search for stop by term
app.get('/api/stops/search', function(req,res){});

// List all activities from 
app.get('/ors/', function(req, res){ });


```

```
// List all activities from db_ors_local
app.get('/api/activities	', function(req, res){ });

```

```
// List activities searching by term in description
app.get('/api/activities/search', function(req, res){ });

```



