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

connectWebViewJavascriptBridge(function (bridge) {
  bridge.init(function (message, responseCallback) {
    let data = {
      success: true
    };
    responseCallback(data);
  });

});


export const authenticate = (user,pass) => window.WebViewJavascriptBridge.send({
  action: Commands.AUTHSERVICE_AUTHENTICATE,
  payload : {email:user,password:pass}
});

export const xAccessToken$ = () => Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
  action : Commands.AUTHSERVICE_ACCESS_TOKEN
}));

export const logout = () => window.WebViewJavascriptBridge.send({
  action : Commands.AUTHSERVICE_LOGOUT
});

export const startAllServices = () => window.WebViewJavascriptBridge.send({
  action: Commands.START_ALL_SERVICES
});

export const enableGPS = () => window.WebViewJavascriptBridge.send({
  action: Commands.SENSORSERVICE_GPS,
  payload: 1
});

export const disableGPS = () => window.WebViewJavascriptBridge.send({
  action: Commands.SENSORSERVICE_GPS,
  payload: 0
});

export const stores$ = () => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_ACTIVESTORESLIST
  }));
};

export const forms$ = () => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_FORMSLIST
  }));
};

export const store$ = (storeId) => {
  return stores$()
    .filter(store => store.storeId === storeId)
    .first();
};

export const createFeature$ = (featureObj) => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_CREATEFEATURE,
    payload: {
      feature: featureObj
    }
  }));
};

export const updateFeature$ = (featureObj) => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_UPDATEFEATURE,
    payload: {
      feature: featureObj
    }
  }));
};

export const deleteFeature$ = (featureId) => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: Commands.DATASERVICE_DELETEFEATURE,
    payload: featureId
  }));
};

export const spatialQuery$ = (filter, storeId) => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: storeId === undefined ? Commands.DATASERVICE_SPATIALQUERYALL : Commands.DATASERVICE_SPATIALQUERY,
    payload: {
      filter: filter,
      storeId: storeId
    }}));
};

export const geospatialQuery$ = (filter, storeId) => {
  return Rx.Observable.fromCallback(window.WebViewJavascriptBridge.send({
    action: storeId === undefined ? Commands.DATASERVICE_GEOSPATIALQUERYALL : Commands.DATASERVICE_GEOSPATIALQUERY,
    payload: {
      filter: filter,
      storeId: storeId
    }
  }));
};

// generic way to send a message to the SpatialConnect bridge
export const sendMessage = (actionId, payload) => window.WebViewJavascriptBridge.send({
  action: actionId,
  payload: payload
});
