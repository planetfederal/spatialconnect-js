# SpatialConnect Javascript Library for Android & iOS
[![Build Status](https://travis-ci.org/tetriscode/spatialconnect-js.svg?branch=dev)](https://travis-ci.org/tetriscode/spatialconnect-js)
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
npm run build-dist
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
For sending and receiving geospatial data, the transmission format is using OpenLayers 3 to do format transformation to GeoJSON.
