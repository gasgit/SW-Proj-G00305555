

# SW-g00305555


**  Glen Gardiner **

The purpose of the project is to use a collection of Public Transport and Outdoor Recreation Strategy Mapping  datasets to build an API to find and determine if the locations are accessible using public transport(Bus_Eireann).

##Tools and Methods

Nodejs and Express to create the server to handle the HTTP, GET, POST, PUT and DELETE requests/responses.
Databases to store datasets to allow for query, update , delete funtionality.All responses will return in json format in the browser or Curl in the console for development and if possible a front end to demo. 


## Datasets include

###DS 1
The Outdoor Recreation Strategy Mapping for West Regional Authority.This dataset includes Galway, Mayo and Roscommon at various locations and wide range of outdoor activities. 
[Outdoor Recreation Strategy](https://data.gov.ie/dataset/outdoor-recreation-strategy).

Dataset formats include csv, geojson.


###DS 2
The public transport dataset I will use is  Bus Eireann which is the most inclusive for the region and  is free to download from [Public Transport](http://www.transportforireland.ie/transitData/PT_Data.html). As the project proceeds there are other options to include if nessary.

Dataset is in text format.

###DS 3
Other datasets may include Blueflag beaches..



## How to Query the API



## Example use of the API


```
// List all activities from 
app.get('/ors/', function(req, res){ });

```

```
// List activities searching by word in description
app.get('/ors/search/', function(req, res){ });

```

```
// get list of stops in each town
app.get('/ors/stops/town/', function(req, res){});

```

