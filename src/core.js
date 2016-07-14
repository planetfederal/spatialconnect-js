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
import { Commands } from './commands';
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

let subjects = {};
for (var command in Commands) {
  subjects[Commands[command]] = new Rx.Subject();
}

connectWebViewJavascriptBridge(function (bridge) {
  bridge.init(function (message, responseCallback) {
    let data = {
      success: true
    };
    responseCallback(data);
  });
  for (var command in Commands) {
    let c = Commands[command];
    bridge.registerHandler(c, (data) => subjects[c].onNext(data));
  }
});

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
  return subjects[Commands.AUTHSERVICE_ACCESS_TOKEN];
};

export const loginStatus$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.AUTHSERVICE_LOGIN_STATUS
  });
  return subjects[Commands.AUTHSERVICE_LOGIN_STATUS];
};

export const startAllServices = () => window.WebViewJavascriptBridge.send({
  type: Commands.START_ALL_SERVICES
});

export const enableGPS = () => window.WebViewJavascriptBridge.send({
  type: Commands.SENSORSERVICE_GPS,
  payload: 1
});

export const disableGPS = () => window.WebViewJavascriptBridge.send({
  type: Commands.SENSORSERVICE_GPS,
  payload: 0
});

export const stores$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_ACTIVESTORESLIST
  });
  return subjects[Commands.DATASERVICE_ACTIVESTORESLIST];
};

export const forms$ = () => {
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_FORMSLIST
  });
  return subjects[Commands.DATASERVICE_FORMSLIST];
};

export const store$ = (storeId) => {
  return stores$()
    .flatMap(data => Rx.Observable.from(data.stores))
    .filter(store => store.storeId === storeId)
    .first();
};

export const createFeature$ = (featureObj) => {
  window.WebViewJavascriptBridge.send({
    type: Commands.DATASERVICE_CREATEFEATURE,
    payload: {
      feature: featureObj
    }
  });
  return subjects[Commands.DATASERVICE_CREATEFEATURE];
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
  window.WebViewJavascriptBridge.send({
    type: storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY,
    payload: {
      filter: filter,
      storeId: storeId
    }
  });
  return subjects[Commands.storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY];
};

export const geospatialQuery$ = (filter, storeId) => {
  console.log('geospatial query with filter ', filter);
  window.WebViewJavascriptBridge.send({
    type: storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY,
    payload: {
      filter: filter,
      storeId: storeId
    }
  });
  return subjects[Commands.storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY];
};

// generic way to send a message to the SpatialConnect bridge
export const sendMessage = (typeId, payload) => window.WebViewJavascriptBridge.send({
  type: typeId,
  payload: payload
});
