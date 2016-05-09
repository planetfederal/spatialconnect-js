'use strict';

import spatialFeature from './sc.spatialfeature';
import * as _ from 'lodash';

export default function(gj, storeId, spatialfeature) {
  var scGeometry = {};
  Object.setPrototypeOf(scGeometry, spatialFeature(storeId, spatialfeature));

  scGeometry.serialize = function() {
    var baseFeature = Object.getPrototypeOf(this).serialize();
    _.merge(gj, baseFeature);
    return gj;
  };

  return scGeometry;
}
