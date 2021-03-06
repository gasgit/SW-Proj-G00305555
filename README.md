

## SW-G00305555


Glen Gardiner 

The purpose of the project is to use a collection of Public Transport and The Outdoor Recreation Strategy datasets to build an API to find and determine if the locations are accessible using public transport(Bus Eireann,Irish Rail).

### Tools and Methods

Nodejs and Express to create the server to handle the HTTP, GET, PUT and DELETE requests/responses.
Databases to store datasets to allow for query, update , delete funtionality.All responses will return in json format in the browser or Curl in the console for development and if possible a front end to demo. 

Online file converter to convert from csv to geojson - http://www.convertcsv.com/csv-to-geojson.htm


### Datasets include

### DS 1
The Outdoor Recreation Strategy Mapping for West Regional Authority.This dataset includes Galway, Mayo and Roscommon at various locations and wide range of outdoor activities. 
[Outdoor Recreation Strategy](https://data.gov.ie/dataset/outdoor-recreation-strategy).

## sample from Outdoor Recreation Strategy

```
{
    "type": "Ors",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -8.574829,53.889773 ]
    },
    "properties": {
    "X":-8.574829,
    "Y":53.889773,
    "FID":2,
    "Category":"C1",
    "Ref":"RN1",
    "name":"Ballaghaderreen Cycling Club",
    "descriptio":"Cycling Club",
    "Email":"ballaghaderreencyclingclub2012@hotmail.com",
    "Web":" ",
    "Phone":"087 2584995 or 0867239978"
    }
  }


```
 


### DS 2
The public transport dataset I will use is Bus Eireann which is the most inclusive for the region and is free to download from [Public Transport](http://www.transportforireland.ie/transitData/PT_Data.html).The Irish Rail dataset for a list of rail stops throughout the country. As the project proceeds there are other options to include if nessary. All bus providers data has the same format and can be easily added to the database.  
### sample from Irish Rail
```
{
    "type": "Train",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -6.04531615893216,54.5139704645036 ]
    },
    "properties": {
    "stop_id":"700GA00035",
    "stop_name":"Lisburn Train Station",
    "location_type":"",
    "parent_station":"Parent2158"
    }
  }
  
```
### sample from Bus Eireann 
```
{
    "type": "Bus",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -5.93660082131046,54.5945926369851 ]
    },
    "properties": {
    "stop_id":"700000000240",
    "stop_name":"Belfast (Europa Bus Centre)"
    }
  }
  
```




### Databases and documentation Used

CouchDB-server used to create orsdb.
http://docs.couchdb.org/en/1.6.1/intro/api.html

PouchDb on express for db_4all_local which sync's with couchDB-server.
http://pouchdb.com/api.html


## cURL

The curl commands used to load couchDb-server on localhost
```
//test couch-server is running
curl http://127.0.0.1:5984/

```

```
//get all dbs listed on couchDb-server
curl -X GET http://127.0.0.1:5984/_all_dbs

```

```
//create db on couchDB-server
curl -X PUT http://127.0.0.1:5984/orsdb

```

```

//delete db from couchDB-server
curl -X DELETE http://127.0.0.1:5984/orsdb

```


To load db from files to CouchDB-Server.. cd into folder containing json files to post. All datasets to orsdb

```
// Bus Eireann bus stops
curl -d @stops_geo.json -H "Content-type: application/json" _id -X POST http://127.0.0.1:5984/orsdb/_bulk_docs

```

```
// Outdoor Recreation Strategy
curl -d @orsgeo.json -H "Content-type: application/json" -X POST http://127.0.0.1:5984/orsdb/_bulk_docs

```

```
// Irish Rail Station stops
curl -d @irishrail_stopsgeo.json -H "Content-type: application/json" -X POST http://127.0.0.1:5984/orsdb/_bulk_docs

```

```
// example to curl new bus stop into couchdb 
curl -X PUT 'http://127.0.0.1:5984/orsdb/12345' -H 'Content-Type:application/json' -d '{"stop_id":"5222","stop_name":"Emmerson Street","stop_lat":22222,"stop_lon":222222}'

```

```
// example to curl new activity into couchdb
//curl -X PUT 'http://127.0.0.1:5984/orsdb/333456' -H 'Content-Type:application/json' -d '{"type": "Bus","geometry": {"type":"Point", "coordinates":[-9.000, 53.12345]},"properties":{"_id":333456,"stop_id" : 654321}}'

```

```
// example of how to put new bus stop into db from browser or postman.
http://127.0.0.1:8000/api/stops/put/?type=Bus&gtype=Point&lon=-9&lat=53.00&_id=44231111glen444344546&stop_id=888

```

```
// example of how to put new activity into db from browser or postman.
http://127.0.0.1:8000/api/activities/put/?type=Ors&gtype=Point&lon=-9&lat=53.00&_id=44431111glen444344546&x=53.00&y=-9&fid=555&ref=MO123&name=hello&descriptio=test&email=mail@mail.com&web=hairy.com&phone=1234567890

```






### How to Query the API

Tested using cURL, Postman and web-browser.



### Example use of the API

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
app.get('/api/stops/search/', function(req,res){});

```



```
// List all activities from db_4all_local
app.get('/api/activities	', function(req, res){ });

```


```
// Search activities description
app.get('/api/activities/search/', function(req, res){ });

```


```
// Search activities name
app.get('/api/activities/search/name/', function(req, res){ });

```





