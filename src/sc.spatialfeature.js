'use strict';

import * as _ from 'lodash';
import uuid from 'uuid';

export function spatialFeature(storeId, layerId, obj) {
  var spatialFeature = {};
  var defaultObj = {
    identifier: undefined,
    date: new Date(),
    createdAt: new Date(),
    properties: {},
    storeId: storeId,
    layerId: layerId,
    style: {},
    type: 'Feature'
  };

  spatialFeature = _.defaults(defaultObj, obj);

  if (spatialFeature.identifier === undefined) {
    spatialFeature.identifier = uuid.v4();
  }

  if (spatialFeature.storeId === undefined) {
    throw 'spatialFeature.storeId must be set explicitly';
  }
  spatialFeature.serialize = function() {
    var obj = {};
    obj.id = this.identifier;
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
