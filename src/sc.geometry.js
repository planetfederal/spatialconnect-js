'use strict';
var spatialFeature = require('./sc.spatialfeature');
var _ = require('lodash');

var scGeospatialFeature = function(gj, storeId, spatialfeature) {
  var scGeometry = {};
  Object.setPrototypeOf(scGeometry, spatialFeature(storeId, spatialfeature));

  scGeometry.serialize = function() {
    var baseFeature = Object.getPrototypeOf(this).serialize();
    _.merge(gj, baseFeature);
    return gj;
  };

  return scGeometry;
};

module.exports = scGeospatialFeature;
