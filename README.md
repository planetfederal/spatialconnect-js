# SpatialConnect Javascript Library for Android & iOS
[![Build Status](https://travis-ci.org/boundlessgeo/spatialconnect-js.svg?branch=dev)](https://travis-ci.org/tetriscode/spatialconnect-js)
## Philosophy
The SpatialConnect javascript bridge is a cross platform solution for letting webviews access native functionality. This has a number of benefits pertaining to performance, security, and persistence to name a few. The request/response pattern is similar to the one way data flow paradigm found in the Flux architecture. A request occurs by calling an action in the library, and then all subscribers to the response observable will receive the result. The subscribers can use RxJS Observable instance methods to filter and operate on events that are emitted. We use the term `spatial` to refer to data with a finite number of dimensions. We use the term `geospatial` to refer to data with a finite number of dimensions where one of those dimensions have geographic coordinates. 


## Getting Started

### Pull down dependencies

```
npm install
```

### Run Tests

```
npm run test
```

### Build distribution file

```
npm run build
```

## Using in your project
```
npm install <path to project>/spatialconnect-js
```

## Communicating with the Bridge

For iOS, JSON objects are sent to the SpatialConnect native library, and for Android, JSON is stringified and sent to the SpatialConnect native library. This is automatically detected in the library by using the user agent for each platform. The envelope for each message is as follows:

```
{
  "action":<integer>,
  "payload":<JSON Object>
}
```

### Available Actions
```
DATASERVICE_ACTIVESTORESLIST = 100
DATASERVICE_ACTIVESTOREBYID = 101
DATASERVICE_SPATIALQUERY = 110
DATASERVICE_SPATIALQUERYALL = 111
DATASERVICE_GEOSPATIALQUERY = 112
DATASERVICE_GEOSPATIALQUERYALL = 113
DATASERVICE_CREATEFEATURE = 114
DATASERVICE_UPDATEFEATURE = 115
DATASERVICE_DELETEFEATURE = 116
SENSORSERVICE_GPS = 200
```
These integer codes are bidirectional and are the same across platforms. 

### SpatialData Transmission
For sending and receiving geospatial data, the transmission format is using OpenLayers 3 to do format transformation to GeoJSON. You can encode geographic features like so
```javascript
var coord = map.getView().getCenter();
var feature = new ol.Feature(new ol.geom.Point(coord)); 
var gjFmt = new ol.format.GeoJSON();
var geojson = gjFmt.writeFeature(feature);
sc.stream.createFeature.subscribe(
  function(f) {
    var gj = gjFmt.readFeature(f);
    vectorSource.addFeature(gj);
  }
);
sc.action.createFeature(geojson,'a5d93796-5026-46f7-a2ff-e5dec85heh6b', 'point_features');
```
You can also create non geographic features (spatial).  

### Querying Data
Getting the current viewport from OpenLayers
```javascript
var extent = map.getView().calculateExtent(map.getSize());
var filter = sc.Filter().geoBBOXContains(extent);
sc.action.geospatialQuery(filter);
```
```javascript
var storeId = 'a5fdreg22';
var filter = { $gte : 5 };
sc.action.spatialQuery(filter,storeId); //For one Store
sc.action.spatialQuery(filter); //For all stores
```
The data responds on the query observable. All components (listview,map) wanting the data can subscribe to that observable
```javascript
var that = this;
sc.stream.spatialQuery.subscribe(
  (data) => {
    var gj = (new ol.format.GeoJSON()).readFeature(data);
    vectorSource.addFeature(gj);
  },
  (err) => {
    this.setState({
      error : err
    });
  },
  () => {
    this.setState({
      error : {}
    });
  }
);
```

### Create Feature


### Data Store Info
Get all stores
```javascript
sc.stream.stores.subscribe(
  (storesArray) => {
    setState({stores:storesArray});
  }
);
sc.action.stores();
```

```javascript
var storeId = 'afdse4';
sc.stream.store.filter((s) => return s.storeId === storeId;)subscribe(
  (store) => {
    setState({storeInfo:store});
  }
);
sc.action.store(storeId);
```

### Location Services
Location Services
```javascript
sc.stream.lastKnownLocation.subscribe(
  (loc) => { console.log(loc); }
);
sc.action.enableGPS();//Enables GPS
sc.action.disableGPS();//Disable GPS
```

### Custom Actions
At run time you can add custom actions to the bridge:   

```javascript
var ActionCmdId;
sc.action.registerAction('CustomActionName',999);   
var payload = {'foo':'bar'};   
sc.action.CustomActionName(payload);
```   

And remove them   
```javascript
sc.action.unregisterAction('CustomActionName');
```

You can also send arbitrary messages to the native bridge like so:   
```javascript
sc.action.sendMessage(998,payload);
```
