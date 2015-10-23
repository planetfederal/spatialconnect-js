'use strict';
/*global WebViewJavascriptBridge*/
var Rx = require('rx');
var Commands = require('./commands');
var filter = require('./filter');
var SCSpatialFeature = require('./sc.spatialfeature.js');
var SCGeometry = require('./sc.geometry');
var pre = require('./pre');

var SpatialConnect = (function() {
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
        success: true
      };
      responseCallback(data);
    });
    bridge.registerHandler('lastKnownLocation', (data) => sc.stream.lastKnownLocation.onNext(data));
    bridge.registerHandler('spatialQuery', (data) => sc.stream.spatialQuery.onNext(data));
    bridge.registerHandler('storesList', (data) => sc.stream.stores.onNext(data));
    bridge.registerHandler('store', (data) => sc.stream.store.onNext(data));
  });

  sc.action = {};
  sc.action.disableGPS = () => window.WebViewJavascriptBridge.send({
    action: Commands.SENSORSERVICE_GPS,
    payload: 0
  });
  sc.action.enableGPS = () => window.WebViewJavascriptBridge.send({
    action: Commands.SENSORSERVICE_GPS,
    payload: 1
  });
  sc.action.stores = () => window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_ACTIVESTORESLIST
  });
  sc.action.store = (storeId) => window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_ACTIVESTOREBYID,
    payload: {
      storeId: storeId
    }
  );
  sc.action.createFeature = (featureObj,storeId) => {
    featureObj.storeId = storeId;
    window.WebViewJavascriptBridge.send({
      action : Commands.DATASERVICE_CREATEFEATURE,
      payload : { feature : featureObj }
    });
  };
  sc.action.spatialQuery = (filter, storeId) => window.WebViewJavascriptBridge.send({
    action: storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY,
    payload: {
      filter: filter.value(),
      storeId: storeId
    }
  });
  sc.action.geospatialQuery = (filter, storeId) => window.WebViewJavascriptBridge.send({
    action: storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY,
    payload: {
      filter: filter.value(),
      storeId: storeId
    }
  });
  sc.action.sendMessage = (action, payload) => window.WebViewJavascriptBridge.send({
    action: action,
    payload: payload
  });
  sc.action.createFeature = (featureObj) => window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_CREATEFEATURE,
    payload: {
      feature: featureObj
    }
  });
  sc.action.updateFeature = (featureObj) => window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_UPDATEFEATURE,
    payload: {
      feature: featureObj
    }
  });
  sc.action.deleteFeature = (featureId) => window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_DELETEFEATURE,
    payload: featureId
  });
  sc.action.sendToSC = (actionCmdId, payload) => window.WebViewJavascriptBridge.send({
    action: actionCmdId,
    payload: payload
  });
  sc.action.registerAction = (actionName, actionCmdInt, fn) => {
    sc.action[actionName] = (action, payload) => {
      window.WebViewJavascriptBridge.send({
        action: actionCmdInt,
        payload: payload
      });
    };
  };
  sc.action.unregisterAction = (actionName) => {
    delete sc.action[actionName];
  };

  return {
    action: sc.action,
    stream: sc.stream
  };
})();

module.exports = SpatialConnect;
