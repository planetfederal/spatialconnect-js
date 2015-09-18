'use strict';

var _ = require('lodash');
var uuid = require('uuid');

var spatialFeature = function(storeId,obj) {
  var spatialFeature = {};
  var defaultObj = {
    identifier : undefined,
    date : new Date(),
    createdAt : new Date(),
    properties : {},
    storeId : storeId,
    style : {},
    type : 'SPATIAL'
  };

  spatialFeature = _.defaults(defaultObj,obj);

  if (spatialFeature.identifier === undefined) {
    spatialFeature.identifier = uuid.v4();
  }

  if (spatialFeature.storeId === undefined) {
    throw 'spatialFeature.storeId must be set explicitly';
  }
  spatialFeature.serialize = function() {
    var obj = {};
    obj.storeId = this.storeId;
    obj.id = this.identifier;
    obj.properties = this.properties;
    obj.date = this.date;
    obj.createdAt = this.createdAt;
    obj.style = this.style;
    return obj;
  };
  return spatialFeature;
};


module.exports = spatialFeature;
