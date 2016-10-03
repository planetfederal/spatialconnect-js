# SpatialConnect Javascript Library for Android & iOS
[![Build Status](https://travis-ci.org/boundlessgeo/spatialconnect-js.svg?branch=develop)](https://travis-ci.org/boundlessgeo/spatialconnect-js)
Version 0.6.0

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

## Installation in your project
```
npm install spatialconnect
```

## Usage in your project

In WebView
```
import * as sc from 'spatialconnect';
```
In React Native
```
import * as sc from 'spatialconnect/native';
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
DATASERVICE_FORMSLIST = 117
SENSORSERVICE_GPS = 200
```
These integer codes are bidirectional and are the same across platforms.

### SpatialData Transmission
For sending and receiving geospatial data, the transmission format is using GeoJSON. You can encode geographic features like so:
```javascript
var gj = {
  "type": "Feature",
  "properties": {
    "foo": "bar"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [ 10, 20 ]
  }
};
var store_name = 'a5d93796-5026-46f7-a2ff-e5dec85heh6b';
var layer_name = 'point_features';
var feature = sc.geometry(store_name, layer_name, gj);
sc.createFeature(feature.serialize()).subscribe(function(f) {
  //add feature to OpenLayers map
  var gj = (new ol.format.GeoJSON()).readFeature(f);
  vectorSource.addFeature(gj);
});
```
You can also create non geographic features (spatial).
```javascript
var properties = { foo: "bar" };
var feature = sc.spatialFeature(store_name, layer_name, properties);
  ```

### Querying Data
Getting the current viewport from OpenLayers
```javascript
var extent = map.getView().calculateExtent(map.getSize());
var filter = sc.Filter().geoBBOXContains(extent);
sc.geospatialQuery(filter);
```
```javascript
var storeId = 'a5fdreg22';
var filter = { $gte : 5 };
sc.spatialQuery(filter,storeId); //For one Store
sc.spatialQuery(filter); //For all stores
```
The data responds on the query observable. All components (listview,map) wanting the data can subscribe to that observable
```javascript
var that = this;
sc.spatialQuery().subscribe(
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

### Data Store Info
Get all stores
```javascript
sc.stores().subscribe(
  (storesArray) => {
    setState({stores:storesArray});
  }
);
```

```javascript
var storeId = 'afdse4';
sc.store(storeId).filter((s) => return s.storeId === storeId;)subscribe(
  (store) => {
    setState({storeInfo:store});
  }
);
```

### Location Services
Location Services
```javascript
sc.lastKnownLocation().subscribe(
  (loc) => { console.log(loc); }
);
sc.enableGPS();//Enables GPS
sc.disableGPS();//Disable GPS
```

### Custom Actions

You can send arbitrary messages to the native bridge like so:
```javascript
sc.action.sendMessage(998,payload);
```
