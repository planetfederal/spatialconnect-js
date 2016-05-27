'use strict';
/*global WebViewJavascriptBridge*/
import Rx from 'rx';
import Commands from './commands';
import { initialize } from './bridge.js';

initialize(); //initalize bridge

let connectWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge);
    }, false);
  }
};

let lastKnownLocationSubject = new Rx.Subject();
let querySubject = new Rx.Subject();
let storeSubject = new Rx.Subject();
let createFeatureSubject = new Rx.Subject();
let formSubject = new Rx.Subject();

connectWebViewJavascriptBridge(function (bridge) {
  bridge.init(function (message, responseCallback) {
    let data = {
      success: true
    };
    responseCallback(data);
  });
  bridge.registerHandler('lastKnownLocation', (data) => lastKnownLocationSubject.onNext(data));
  bridge.registerHandler('spatialQuery', (data) => querySubject.onNext(data));
  bridge.registerHandler('storesList', (data) => storeSubject.onNext(data));
  bridge.registerHandler('createFeature', (data) => createFeatureSubject.onNext(data));
  bridge.registerHandler('formsList', (data) => formSubject.onNext(data));
});

const startAllServices = () => window.WebViewJavascriptBridge.send({
  action: Commands.START_ALL_SERVICES
});

const enableGPS = () => window.WebViewJavascriptBridge.send({
  action: Commands.SENSORSERVICE_GPS,
  payload: 1
});

const disableGPS = () => window.WebViewJavascriptBridge.send({
  action: Commands.SENSORSERVICE_GPS,
  payload: 0
});

const lastKnownLocation = () => {
  enableGPS();
  return lastKnownLocationSubject;
};

const stores = () => {
  window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_ACTIVESTORESLIST
  });
  return storeSubject;
};

const forms = () => {
  window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_FORMSLIST
  });
  return formSubject;
};

const store = (storeId) => {
  return stores()
    .flatMap(data => Rx.Observable.from(data.stores))
    .filter(store => store.storeId === storeId)
    .first();
};

const createFeature = (featureObj) => {
  window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_CREATEFEATURE,
    payload: {
      feature: featureObj
    }
  });
  return createFeatureSubject;
};

const updateFeature = (featureObj) => window.WebViewJavascriptBridge.send({
  action: Commands.DATASERVICE_UPDATEFEATURE,
  payload: {
    feature: featureObj
  }
});

const deleteFeature = (featureId) => window.WebViewJavascriptBridge.send({
  action: Commands.DATASERVICE_DELETEFEATURE,
  payload: featureId
});

const spatialQuery = (filter, storeId) => {
  window.WebViewJavascriptBridge.send({
    action: storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY,
    payload: {
      filter: filter,
      storeId: storeId
    }
  });
  return querySubject;
};

const geospatialQuery = (filter, storeId) => {
  console.log('geospatial query with filter ', filter);
  window.WebViewJavascriptBridge.send({
    action: storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY,
    payload: {
      filter: filter,
      storeId: storeId
    }
  });
  return querySubject;
};

// generic way to send a message to the SpatialConnect bridge
const sendMessage = (actionId, payload) => window.WebViewJavascriptBridge.send({
  action: actionId,
  payload: payload
});

export {
  startAllServices,
  enableGPS,
  disableGPS,
  lastKnownLocation,
  stores,
  forms,
  store,
  createFeature,
  updateFeature,
  deleteFeature,
  spatialQuery,
  geospatialQuery,
  sendMessage
};
