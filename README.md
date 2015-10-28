

# SW-g00305555


** by glen gardiner **


The purpose of the project is to use a collection of public transport datasets to build an API using 
nodejs and express.


## Datasets used
I will use datasets for city_link, Bus_eireann and Irish_rail to begin with.
free to download from http://www.transportforireland.ie/transitData/PT_Data.html.


## How to Query the API
```
app.get('/', function(req, res){
  console.log(data);
});
```

```
// return json for stops position on the list bus_eireann
app.get('/bus_eireann/stop/:id', function(req, res) {
	var result = (data[req.params.id]);
	console.log(result);
  	res.json(result);
});
```

```
// get list of stops in each town
app.get('/stops/town/', function(req, res){
}
```

## Example use of the API

