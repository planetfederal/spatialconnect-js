/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import Rx from 'rx';
import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import { Commands } from './commands';
import { initialize } from './bridge';

const COMPLETED = '_completed';

initialize(); // initalize bridge

const connectWebViewJavascriptBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', () => {
      callback(WebViewJavascriptBridge);
    }, false);
  }
};

connectWebViewJavascriptBridge((bridge) => {
  bridge.init((message, responseCallback) => {
    const data = { success: true };
    responseCallback(data);
  });
});

let uniqueId = 1;
const uniqueType = type =>
  `${type.toString()}_${(uniqueId += 1)}_${new Date().getTime()}`;

const fromEvent$ = responseId => Rx.Observable.fromEventPattern(
  function addHandler(h) {
    return Platform.OS === 'ios' ?
      NativeAppEventEmitter.addListener(responseId.toString(), h) :
      DeviceEventEmitter.addListener(responseId.toString(), h);
  },
  function delHandler(_, signal) { signal.remove(); });

/**
 * Authenticate a user. No return observable,
 * subscribe to {@link loginStatus$} for results of authentication.
 * @param {string} email the user's email address
 * @param {string} password the user's password
 */
export const authenticate = (email, password) => window.WebViewJavascriptBridge.send({
  type: Commands.AUTHSERVICE_AUTHENTICATE,
  payload: { email, password },
});

/**
 * Logout a user. No return observable,
 * subscribe to {@link loginStatus$} for results of authentication.
 */
export const logout = () => window.WebViewJavascriptBridge.send({
  type: Commands.AUTHSERVICE_LOGOUT,
});

/**
 * Get the current json web token of the currently
 * authenticated user
 * @returns {Observable} emits AccessTokenEvent
 */
export const xAccessToken$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_ACCESS_TOKEN,
  });
  return fromEvent$(Commands.AUTHSERVICE_ACCESS_TOKEN);
};

/**
 * Get the authentication status of the current user
 * @returns {Observable} emits LoginStatusEvent
 */
export const loginStatus$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_LOGIN_STATUS,
  });
  return fromEvent$(Commands.AUTHSERVICE_LOGIN_STATUS);
};

/**
 * Get a stream of notifications
 * @returns {Observable} emits NotificationEvent
 */
export const notifications$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.NOTIFICATIONS,
  });
  return fromEvent$(Commands.NOTIFICATIONS);
};

/**
 * Start all services in the native SDK
 */
export const startAllServices = () => window.WebViewJavascriptBridge.send({
  type: Commands.START_ALL_SERVICES,
});

/**
 * Enable the device GPS
 * @returns {Observable} emits GPSEvent
 */
export const enableGPS = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.SENSORSERVICE_GPS,
    payload: 1,
  });
  return fromEvent$(Commands.SENSORSERVICE_GPS);
};

/**
 * Disable the device GPS
 */
export const disableGPS = () => window.WebViewJavascriptBridge.send({
  type: Commands.SENSORSERVICE_GPS,
  payload: 0,
});

/**
 * Get a list of all the stores loaded from the config
 * @returns {Observable} emits StoreListEvent
 */
export const stores$ = () => {
  const responseId = uniqueType(Commands.DATASERVICE_STORELIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_STORELIST,
    responseId,
  });
  return fromEvent$(responseId);
};

/**
 * Get a list of all the Data Stores that are currently running
 * @returns {Observable} emits ActiveStoreListEvent
 */
export const activeStores$ = () => {
  const responseId = uniqueType(Commands.DATASERVICE_ACTIVESTORESLIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_ACTIVESTORESLIST,
    responseId,
  });
  return fromEvent$(responseId);
};

/**
 * Get a list of all the forms loaded from the config
 * @returns {Observable} emits FormListEvent
 */
export const forms$ = () => {
  const responseId = uniqueType(Commands.DATASERVICE_FORMLIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_FORMLIST,
    responseId,
  });
  return fromEvent$(responseId);
};

/**
 * Get a store by its id
 * @param {string} storeId
 * @returns {object} the store
 */
export const store$ = storeId =>
  stores$()
    .flatMap(data => Rx.Observable.from(data.payload.stores))
    .filter(store => store.storeId === storeId)
    .first()
    .map(store => ({ type: Commands.DATASERVICE_ACTIVESTOREBYID, payload: store }));

/**
 * Create a feature.
 * @param {SCGeometry|SCSpatialFeature} feature
 * @returns {Observable} emits CreateFeatureEvent
 */
export const createFeature$ = (feature) => {
  const responseId = uniqueType(Commands.DATASERVICE_CREATEFEATURE);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_CREATEFEATURE,
    responseId,
    payload: { feature },
  });
  return fromEvent$(responseId);
};

/**
 * Update a feature.
 * @param {SCGeometry|SCSpatialFeature} feature
 * @returns {Observable} emits UpdateFeatureEvent
 */
export const updateFeature$ = (feature) => {
  const responseId = uniqueType(Commands.DATASERVICE_UPDATEFEATURE);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_UPDATEFEATURE,
    responseId,
    payload: { feature },
  });
  return fromEvent$(responseId);
};

/**
 * Delete a feature.
 * @param {string} featureId
 */
export const deleteFeature = featureId => window.WebViewJavascriptBridge.send({
  type: Commands.DATASERVICE_DELETEFEATURE,
  payload: featureId,
});

/**
 * Perform a query on the currently running list of stores.
 * @param {object} filter a filter object
 * @param {string|array} [storeId] if omitted, all running stores are queried.
 */
export const query$ = (filter, storeId) => {
  const c = storeId === undefined ?
    Commands.DATASERVICE_QUERYALL : Commands.DATASERVICE_QUERY;
  const payload = {};
  if (filter) {
    payload.filter = filter.value ? filter.value() : filter;
  } else {
    payload.filter = {};
  }
  if (storeId) {
    if (typeof storeId === 'string') {
      payload.storeId = [storeId];
    }
    if (Array.isArray(storeId)) {
      payload.storeId = storeId;
    }
  }
  const responseId = uniqueType(c);
  window.WebViewJavascriptBridge.send({
    type: c,
    responseId,
    payload,
  });
  return fromEvent$(responseId).takeUntil(fromEvent$(responseId + COMPLETED));
};

/**
 * Perform a spatial query on the currently running list of spatial stores.
 * @param {object} filter a filter object
 * @param {string|array} [storeId] if omitted, all running stores are queried.
 */
export const spatialQuery$ = (filter, storeId) => {
  const c = storeId === undefined ?
    Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY;
  const payload = {};
  if (filter) {
    payload.filter = filter.value ? filter.value() : filter;
  } else {
    payload.filter = {};
  }
  if (storeId) {
    if (typeof storeId === 'string') {
      payload.storeId = [storeId];
    }
    if (Array.isArray(storeId)) {
      payload.storeId = storeId;
    }
  }
  const responseId = uniqueType(c);
  window.WebViewJavascriptBridge.send({
    type: c,
    responseId,
    payload,
  });
  return fromEvent$(responseId).takeUntil(fromEvent$(responseId + COMPLETED));
};

export const getRequest = (url) => {
  const responseId = uniqueType(Commands.NETWORKSERVICE_GET_REQUEST);
  window.WebViewJavascriptBridge.send({
    type: Commands.NETWORKSERVICE_GET_REQUEST,
    responseId,
    payload: { url },
  });
};

export const postRequest = (url, body) => {
  const responseId = uniqueType(Commands.NETWORKSERVICE_POST_REQUEST);
  window.WebViewJavascriptBridge.send({
    type: Commands.NETWORKSERVICE_POST_REQUEST,
    responseId,
    payload: { url, body },
  });
};

/**
 * Get the HTTP URI of the connected backend.
 * @returns {Observable} emits BackendHTTPURIEvent
 */
export const backendUri$ = () => {
  const responseId = uniqueType(Commands.BACKENDSERVICE_HTTP_URI);
  window.WebViewJavascriptBridge.send({
    type: Commands.BACKENDSERVICE_HTTP_URI,
    responseId,
  });
  return fromEvent$(responseId);
};

/**
 * Returns an observable that is always up-to-date with the current connection status
 * of the backend MQTT service.
 * @returns {Observable} emits BackendMQTTConnectedEvent
 */
export const mqttConnected$ = () => {
  const responseId = uniqueType(Commands.BACKENDSERVICE_MQTT_CONNECTED);
  window.WebViewJavascriptBridge.send({
    type: Commands.BACKENDSERVICE_MQTT_CONNECTED,
    responseId,
  });
  return fromEvent$(responseId);
};

/**
 * Binds the react-native-maps map view reference to the native sdk.
 * @param {object} node native node handle, use findNodeHandle
 * @param {function} callback callback with first argument as error
 * @example sc.bindMapView(findNodeHandle(this.mapRef));
 */
export const bindMapView = (node, callback) => {
  NativeModules.RNSpatialConnect.bindMapView(node, callback);
};

/**
 * Adds raster layers from the stores to the binded map view
 * @param {array} storeIds The stores in which to look for raster layers
 */
export const addRasterLayers = (storeIds) => {
  NativeModules.RNSpatialConnect.addRasterLayers(storeIds);
};

export const addConfigFilepath = (path) => {
  NativeModules.RNSpatialConnect.addConfigFilepath(path);
};

// generic way to send a message to the SpatialConnect bridge
export const sendMessage = (typeId, payload) => window.WebViewJavascriptBridge.send({
  type: typeId,
  payload,
});
