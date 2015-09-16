'use strict';
/*global WebViewJavascriptBridge*/
var Rx = require('rx');
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
  });

  sc.action = {};
  sc.action.disableGPS = () => window.WebViewJavascriptBridge.send({action:'gps',value:0});
  sc.action.enableGPS = () => window.WebViewJavascriptBridge.send({action:'gps',value:1});
  sc.action.stores = () => window.WebViewJavascriptBridge.send({action:'stores'});
  sc.action.spatialQuery = (storeId) => window.WebViewJavascriptBridge.send(
    {
      action : 'spatialQuery',
      value : storeId === undefined ? 'allstores' : storeId
    }
  );
  sc.action.geospatialQuery = (storeId) => window.WebViewJavascriptBridge.send(
    {
      action : 'geospatialQuery',
      value : storeId === undefined ? 'allstores' : storeId
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
      action : 'createFeature',
      value : { feature : featureObj }
    }
  );
  sc.action.updateFeature = (featureObj) => window.WebViewJavascriptBridge.send(
    {
      action : 'updateFeature',
      value : { feature : featureObj }
    }
  );
  sc.action.deleteFeature = (featureId) => window.WebViewJavascriptBridge.send(
    {
      action : 'deleteFeature',
      value : featureId
    }
  );

  return sc;
})();

module.exports = SpatialConnect;
