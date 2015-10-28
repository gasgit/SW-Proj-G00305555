

# SW-g00305555


** by glen gardiner **


The purpose of the project is to use a collection of public transport and Galway County Council datasets to build an API to determine if the Outdoor Recreation locations are accessible using public transport(Bus_Eireann).


## Datasets to date include


###DS 1
I will use the dataset for Outdoor Recreation Strategy Mapping for West Regional Authority.
This dataset includes Galway, Mayo and Roscommon for various outdoor activities.
https://data.gov.ie/dataset/outdoor-recreation-strategy


###DS 2
Bus Eireann which is free to download from http://www.transportforireland.ie/transitData/PT_Data.html.
There is 

###DS 3


## How to Query the API




## Example use of the API

```
// retrieve all activities from file
app.get('/', function(req, res){
	console.log(ors);
})

```


```
// find activity by searching word in description
app.get('/search/', function(req, res){
  console.log(ors);
});

```

```
// return json for stops position on the list bus_eireann
app.get('/bus_eireann/stop/:id', function(req, res) {
	var result = (data[req.params.id]);
  	res.json(result);
});
```

```
// get list of stops in each town
app.get('/stops/town/', function(req, res){

	var town = req.query.town;
}
```

