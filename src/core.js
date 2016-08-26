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

'use strict';
/*global WebViewJavascriptBridge*/
import Rx from 'rx';
import { isArray } from 'lodash';
import { Commands } from './commands';
import { initialize } from './bridge.js';
import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform
} from 'react-native';

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

connectWebViewJavascriptBridge(function (bridge) {
  bridge.init(function (message, responseCallback) {
    let data = {
      success: true
    };
    responseCallback(data);
  });
});

let uniqueId = 1;
const uniqueType = type => {
  return type.toString() + '_' + (uniqueId++) + '_' + new Date().getTime();
};

const fromEvent$ = responseId => Rx.Observable.fromEventPattern(
  function addHandler (h) {
    return Platform.OS === 'ios' ?
      NativeAppEventEmitter.addListener(responseId, h) :
      DeviceEventEmitter.addListener(responseId, h);
  },
  function delHandler (_, signal) { signal.remove(); }
);

export const authenticate = (user,pass) => window.WebViewJavascriptBridge.send({
  type: Commands.AUTHSERVICE_AUTHENTICATE,
  payload : {email:user,password:pass}
});

export const logout = () => window.WebViewJavascriptBridge.send({
  type : Commands.AUTHSERVICE_LOGOUT
});

export const xAccessToken$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_ACCESS_TOKEN
  });
  return fromEvent$(Commands.AUTHSERVICE_ACCESS_TOKEN.toString());
};

export const loginStatus$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_LOGIN_STATUS
  });
  return fromEvent$(Commands.AUTHSERVICE_LOGIN_STATUS.toString());
};

export const notifications$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.NOTIFICATIONS
  });
  return fromEvent$(Commands.NOTIFICATIONS.toString());
};

export const startAllServices = () => window.WebViewJavascriptBridge.send({
  type: Commands.START_ALL_SERVICES
});

export const enableGPS = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.SENSORSERVICE_GPS,
    payload: 1
  });
  return fromEvent$(Commands.SENSORSERVICE_GPS.toString());
};

export const disableGPS = () => window.WebViewJavascriptBridge.send({
  type: Commands.SENSORSERVICE_GPS,
  payload: 0
});

export const stores$ = () => {
  let responseId = uniqueType(Commands.DATASERVICE_ACTIVESTORESLIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_ACTIVESTORESLIST,
    responseId: responseId
  });
  return fromEvent$(responseId);
};

export const forms$ = () => {
  let responseId = uniqueType(Commands.DATASERVICE_FORMLIST);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_FORMLIST,
    responseId: responseId
  });
  return fromEvent$(responseId);
};

export const store$ = (storeId) => {
  return stores$()
    .flatMap(data => Rx.Observable.from(data.payload.stores))
    .filter(store => store.storeId === storeId)
    .first()
    .map(store => ({ type: Commands.DATASERVICE_ACTIVESTOREBYID, payload: store }));
};

export const createFeature$ = (featureObj) => {
  let responseId = uniqueType(Commands.DATASERVICE_CREATEFEATURE);
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_CREATEFEATURE,
    responseId: responseId,
    payload: {
      feature: featureObj
    }
  });
  return fromEvent$(responseId);
};

export const updateFeature = (featureObj) => window.WebViewJavascriptBridge.send({
  type: Commands.DATASERVICE_UPDATEFEATURE,
  payload: {
    feature: featureObj
  }
});

export const deleteFeature = (featureId) => window.WebViewJavascriptBridge.send({
  type: Commands.DATASERVICE_DELETEFEATURE,
  payload: featureId
});

export const spatialQuery$ = (filter, storeId) => {
  let c = storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY;
  if (storeId) {
    if (typeof storeId === 'string') {
      storeId = [storeId];
    }
  }
  let responseId = uniqueType(c);
  window.WebViewJavascriptBridge.send({
    type: c,
    responseId: responseId,
    payload: {
      filter: filter.value(),
      storeId: storeId
    }
  });
  return fromEvent$(responseId);
};

export const geospatialQuery$ = (filter, storeId) => {
  let c = storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY;
  if (storeId) {
    if (typeof storeId === 'string') {
      storeId = [storeId];
    }
  }
  let responseId = uniqueType(c);
  window.WebViewJavascriptBridge.send({
    type: c,
    responseId: responseId,
    payload: {
      filter: filter.value(),
      storeId: storeId
    }
  });
  return fromEvent$(responseId);
};

export const getRequest = (url) => {
  let responseId = uniqueType(Commands.NETWORKSERVICE_GET_REQUEST);
  window.WebViewJavascriptBridge.send({
    type : Commands.NETWORKSERVICE_GET_REQUEST,
    responseId : responseId,
    payload : {
      url : url
    }
  });
};

export const postRequest = (url,body) => {
  let responseId = uniqueType(Commands.NETWORKSERVICE_POST_REQUEST);
  window.WebViewJavascriptBridge.send({
    type : Commands.NETWORKSERVICE_POST_REQUEST,
    responseId : responseId,
    payload : {
      url : url,
      body : body
    }
  });
};

// generic way to send a message to the SpatialConnect bridge
export const sendMessage = (typeId, payload) => window.WebViewJavascriptBridge.send({
  type: typeId,
  payload: payload
});
