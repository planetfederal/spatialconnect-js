'use strict';

import Commands from './commands';
import Filter from './filter';
import SCSpatialFeature from './sc.spatialfeature';
import SCGeometry from './sc.geometry';
import SC from './core';

var SpatialConnect = (function() {
  var sc = {};
  sc.action = SC.action;
  sc.stream = SC.stream;
  sc.filter = Filter;
  sc.gfeature = SCGeometry;
  sc.feature = SCSpatialFeature;
  sc.Commands = Commands;
  return sc;
})();

export default SpatialConnect;
