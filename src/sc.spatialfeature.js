'use strict';

import * as _ from 'lodash';

export function spatialFeature(storeId, layerId, featureProps) {
  if (layerId === undefined) {
    throw 'layerId must be defined for all spatial features.';
  }
  var spatialFeature = {};
  var defaultObj = {
    date: new Date(),
    createdAt: new Date(),
    properties: {},
    storeId: storeId,
    layerId: layerId,
    style: {},
    type: 'Feature'
  };

  spatialFeature = _.defaults({ properties: featureProps }, defaultObj);

  spatialFeature.serialize = function() {
    var obj = {};
    obj.type = this.type;
    obj.storeId = this.storeId;
    obj.layerId = this.layerId;
    obj.properties = this.properties;
    obj.date = this.date;
    obj.createdAt = this.createdAt;
    obj.style = this.style;
    return obj;
  };
  return spatialFeature;
}