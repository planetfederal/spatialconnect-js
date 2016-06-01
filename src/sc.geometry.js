'use strict';

import { spatialFeature } from './sc.spatialfeature';
import * as _ from 'lodash';

export function geometry(storeId, layerId, gj) {
  var scGeometry = Object.create(spatialFeature(storeId, layerId, gj.properties));

  var baseFeature = Object.getPrototypeOf(scGeometry).serialize();
  scGeometry = _.defaults(gj, baseFeature);

  if (scGeometry.geometry === undefined) {
    scGeometry.geometry = null;
  }

  scGeometry.serialize = function() {
    var obj = {};
    obj.type = this.type;
    obj.storeId = this.storeId;
    obj.layerId = this.layerId;
    obj.properties = this.properties;
    obj.date = this.date;
    obj.createdAt = this.createdAt;
    obj.style = this.style;
    obj.geometry = this.geometry;
    return obj;
  };

  return scGeometry;
}
