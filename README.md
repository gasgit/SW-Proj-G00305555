

# SW-g00305555


**  Glen Gardiner **


The purpose of the project is to use a collection of Public Transport and Outdoor Recreation Strategy Mapping  datasets to build an API to find and determine if the locations are accessible using public transport(Bus_Eireann).

##Tools and Methods

Nodejs and Express to create the server to handle the HTTP,GET,POST,PUT and DELETE requests/responces.
Databases to store datasets to allow for query, update , delete funtionality.All responces will return in json format using browser or Curl in theterminal for development and if possible a front end to demo. 


## Datasets include

###DS 1
The Outdoor Recreation Strategy Mapping for West Regional Authority.This dataset includes Galway, Mayo and Roscommon at various locations and wide range of outdoor activities. 
[Outdoor Recreation Strategy](https://data.gov.ie/dataset/outdoor-recreation-strategy)


###DS 2
The public transport dataset I will use is  Bus Eireann which is the most inclusive for the region and  is free to download from [Public Transport](http://www.transportforireland.ie/transitData/PT_Data.html). As the project proceeds there are other options to include if nessary.

###DS 3



## How to Query the API








## Example use of the API

```
// retrieve all activities from file
app.get('/', function(req, res){ })

```


```
// find activities searching by word in description
app.get('/search/', function(req, res){ });

```


```
// get list of stops in each town
app.get('/stops/town/', function(req, res){}
```

