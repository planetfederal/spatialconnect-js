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

export const authenticate = (user, pass) => window.WebViewJavascriptBridge.send({
  type: Commands.AUTHSERVICE_AUTHENTICATE,
  payload: { email: user, password: pass },
});

export const logout = () => window.WebViewJavascriptBridge.send({
  type: Commands.AUTHSERVICE_LOGOUT,
});

export const xAccessToken$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_ACCESS_TOKEN,
  });
  return fromEvent$(Commands.AUTHSERVICE_ACCESS_TOKEN);
};

export const loginStatus$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_LOGIN_STATUS,
  });
  return fromEvent$(Commands.AUTHSERVICE_LOGIN_STATUS);
};

export const notifications$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.NOTIFICATIONS,
  });
  return fromEvent$(Commands.NOTIFICATIONS);
};

export const startAllServices = () => window.WebViewJavascriptBridge.send({
  type: Commands.START_ALL_SERVICES,
});

export const enableGPS = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.SENSORSERVICE_GPS,
    payload: 1,
  });
  return fromEvent$(Commands.SENSORSERVICE_GPS);
};

export const disableGPS = () => window.WebViewJavascriptBridge.send({
  type: Commands.SENSORSERVICE_GPS,
  payload: 0,
});

export const stores$ = () => {
  const responseId = uniqueType(Commands.DATASERVICE_STORELIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_STORELIST,
    responseId,
  });
  return fromEvent$(responseId);
};

export const activeStores$ = () => {
  const responseId = uniqueType(Commands.DATASERVICE_ACTIVESTORESLIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_ACTIVESTORESLIST,
    responseId,
  });
  return fromEvent$(responseId);
};

export const forms$ = () => {
  const responseId = uniqueType(Commands.DATASERVICE_FORMLIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_FORMLIST,
    responseId,
  });
  return fromEvent$(responseId);
};

export const store$ = storeId =>
  stores$()
    .flatMap(data => Rx.Observable.from(data.payload.stores))
    .filter(store => store.storeId === storeId)
    .first()
    .map(store => ({ type: Commands.DATASERVICE_ACTIVESTOREBYID, payload: store }));


export const createFeature$ = (feature) => {
  const responseId = uniqueType(Commands.DATASERVICE_CREATEFEATURE);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_CREATEFEATURE,
    responseId,
    payload: { feature },
  });
  return fromEvent$(responseId);
};

export const updateFeature$ = (feature) => {
  const responseId = uniqueType(Commands.DATASERVICE_UPDATEFEATURE);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_UPDATEFEATURE,
    responseId,
    payload: { feature },
  });
  return fromEvent$(responseId);
};

export const deleteFeature = featureId => window.WebViewJavascriptBridge.send({
  type: Commands.DATASERVICE_DELETEFEATURE,
  payload: featureId,
});

export const spatialQuery$ = (filter, storeId) => {
  const c = storeId === undefined ?
    Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY;
  let storeIds = storeId;
  if (storeIds) {
    if (typeof storeIds === 'string') {
      storeIds = [storeIds];
    }
  }
  const responseId = uniqueType(c);
  window.WebViewJavascriptBridge.send({
    type: c,
    responseId,
    payload: {
      filter: filter.value(),
      storeIds,
    },
  });
  return fromEvent$(responseId).takeUntil(fromEvent$(responseId + COMPLETED));
};

export const geospatialQuery$ = (filter, storeId) => {
  const c = storeId === undefined ?
    Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY;
  let storeIds = storeId;
  if (storeIds) {
    if (typeof storeIds === 'string') {
      storeIds = [storeIds];
    }
  }
  const responseId = uniqueType(c);
  window.WebViewJavascriptBridge.send({
    type: c,
    responseId,
    payload: {
      filter: filter.value(),
      storeIds,
    },
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

export const backendUri$ = () => {
  const responseId = uniqueType(Commands.BACKENDSERVICE_HTTP_URI);
  window.WebViewJavascriptBridge.send({
    type: Commands.BACKENDSERVICE_HTTP_URI,
    responseId,
  });
  return fromEvent$(responseId);
};

export const bindMapView = (node) => {
  NativeModules.SCBridge.bindMapView(node);
};

// generic way to send a message to the SpatialConnect bridge
export const sendMessage = (typeId, payload) => window.WebViewJavascriptBridge.send({
  type: typeId,
  payload,
});
