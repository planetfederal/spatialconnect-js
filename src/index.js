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

  var connectWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(WebViewJavascriptBridge);
      }, false);
    }
  };

  sc.stream = {};
  sc.stream.lastKnownLocation = new Rx.Subject();
  sc.stream.spatialQuery = new Rx.Subject();
  sc.stream.stores = new Rx.Subject();
  sc.stream.store = new Rx.Subject();

  connectWebViewJavascriptBridge(function(bridge) {
    bridge.init(function(message, responseCallback) {
      var data = {
        success : true
      };
      responseCallback(data);
    });
    bridge.registerHandler('lastKnownLocation',(data) => sc.stream.lastKnownLocation.onNext(data));
    bridge.registerHandler('spatialQuery',(data) => sc.stream.spatialQuery.onNext(data));
    bridge.registerHandler('storesList',(data) => sc.stream.stores.onNext(data));
    bridge.registerHandler('store',(data) => sc.stream.store.onNext(data));
  });

  sc.action = {};
  sc.action.disableGPS = () => window.WebViewJavascriptBridge.send({action:Commands.SENSORSERVICE_GPS,value:0});
  sc.action.enableGPS = () => window.WebViewJavascriptBridge.send({action:Commands.SENSORSERVICE_GPS,value:1});
  sc.action.stores = () => window.WebViewJavascriptBridge.send(
    {
      action:Commands.DATASERVICE_ACTIVESTORESLIST
    }
  );
  sc.action.store = (storeId) => window.WebViewJavascriptBridge.send(
    {
      action:Commands.DATASERVICE_ACTIVESTOREBYID,
      value : {
        storeId : storeId
      }
    }
  );
  sc.action.spatialQuery = (filter,storeId) => window.WebViewJavascriptBridge.send(
    {
      action : storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL :
        Commands.DATASERVICE_SPATIALQUERY,
      value : {
        filter : filter.value(),
        storeId : storeId
      }
    }
  );
  sc.action.geospatialQuery = (filter,storeId) => window.WebViewJavascriptBridge.send(
    {
      action : storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL :
        Commands.DATASERVICE_GEOSPATIALQUERY,
        value : {
          filter : filter.value(),
          storeId : storeId
        }
    }
  );
  sc.action.sendMessage = (action,value) => window.WebViewJavascriptBridge.send(
    {
      action : action,
      value : value
    }
  );
  sc.action.createFeature = (featureObj) => window.WebViewJavascriptBridge.send(
    {
      action : Commands.DATASERVICE_CREATEFEATURE,
      value : { feature : featureObj }
    }
  );
  sc.action.updateFeature = (featureObj) => window.WebViewJavascriptBridge.send(
    {
      action : Commands.DATASERVICE_UPDATEFEATURE,
      value : { feature : featureObj }
    }
  );
  sc.action.deleteFeature = (featureId) => window.WebViewJavascriptBridge.send(
    {
      action : Commands.DATASERVICE_DELETEFEATURE,
      value : featureId
    }
  );
  sc.Filter = filter;
  sc.SCGeometry = SCGeometry;
  sc.SCSpatialFeature = SCSpatialFeature;
  sc.Commands = Commands;
  return sc;
})();

module.exports = SpatialConnect;
