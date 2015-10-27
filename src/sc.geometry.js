'use strict';
var spatialFeature = require('./sc.spatialfeature');
var ol = require('openlayers');
var _ = require('lodash');

var scGeospatialFeature = function(geometry, storeId, spatialfeature) {
  var scGeometry = {};
  Object.setPrototypeOf(scGeometry, spatialFeature(storeId, spatialfeature));
  scGeometry.geometry = geometry;

  scGeometry.serialize = function() {
    var geojsonFormatter = new ol.format.GeoJSON();
    var gj = geojsonFormatter.writeFeaturesObject(this.geometry);
    var baseFeature = Object.getPrototypeOf(this).serialize();
    _.merge(gj, baseFeature);
    return gj;
  };

  return scGeometry;
};

module.exports = scGeospatialFeature;
