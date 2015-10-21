'use strict';
/*global WebViewJavascriptBridge*/
var Rx = require('rx');
var Commands = require('./commands');
var filter = require('./filter');
var SCSpatialFeature = require('./sc.spatialfeature.js');
var SCGeometry = require('./sc.geometry');
var pre = require('./pre');

var SpatialConnect = (function(){
  var sc = {};

  sc.Filter = filter;
  sc.gfeature = SCGeometry;
  sc.feature = SCSpatialFeature;
  sc.Commands = Commands;
  return sc;
})();

module.exports = SpatialConnect;
