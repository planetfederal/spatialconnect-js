/* globals jest:false,describe:false,it:false,expect:false*/

import { NativeModules } from 'react-native';
import {
  authenticate,
  logout,
  xAccessToken$,
  loginStatus$,
  notifications$,
  startAllServices,
  enableGPS,
  disableGPS,
  stores$,
  activeStores$,
  forms$,
  createFeature$,
  updateFeature$,
  deleteFeature,
  query$,
  spatialQuery$,
  backendUri$,
  mqttConnected$,
 } from '../src/core';
import { filter } from '../src/filter';
import { Commands } from '../src/commands';

describe('core methods', () => {
  it('to send auth credentials over the bridge', () => {
    authenticate('email', 'password');
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.AUTHSERVICE_AUTHENTICATE, payload: { email: 'email', password: 'password' } },
    );
  });

  it('to send logout', () => {
    logout();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.AUTHSERVICE_LOGOUT },
    );
  });

  it('to send xaccesstoken', () => {
    xAccessToken$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.AUTHSERVICE_ACCESS_TOKEN },
    );
  });

  it('to send loginStatus', () => {
    loginStatus$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.AUTHSERVICE_LOGIN_STATUS },
    );
  });

  it('to send notifications request', () => {
    notifications$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.NOTIFICATIONS },
    );
  });

  it('to send startAllServices request', () => {
    startAllServices();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.START_ALL_SERVICES },
    );
  });

  it('to send enableGPS request', () => {
    enableGPS();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.SENSORSERVICE_GPS, payload: 1 },
    );
  });

  it('to send disableGPS request', () => {
    disableGPS();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.SENSORSERVICE_GPS, payload: 0 },
    );
  });

  it('to send stores request', () => {
    stores$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_STORELIST, responseId: expect.any(String) },
    );
  });

  it('to send activeStores request', () => {
    activeStores$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_ACTIVESTORESLIST, responseId: expect.any(String) },
    );
  });

  it('to send forms request', () => {
    forms$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_FORMLIST, responseId: expect.any(String) },
    );
  });

  it('to send createFeature request', () => {
    createFeature$({});
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_CREATEFEATURE,
        responseId: expect.any(String),
        payload: { feature: {} } },
    );
  });

  it('to send updateFeature request', () => {
    updateFeature$({});
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_UPDATEFEATURE,
        responseId: expect.any(String),
        payload: { feature: {} } },
    );
  });

  it('to send deleteFeature request', () => {
    deleteFeature('foo');
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_DELETEFEATURE, payload: 'foo' },
    );
  });

  it('to send query all stores request with null filter', () => {
    query$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_QUERYALL,
        responseId: expect.any(String),
        payload: { filter: expect.any(Object) } },
    );
  });

  it('to send query all stores request with empty filter', () => {
    query$({});
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_QUERYALL,
        responseId: expect.any(String),
        payload: { filter: expect.any(Object) } },
    );
  });

  it('to send query all stores request with filter', () => {
    query$(filter().limit(50));
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_QUERYALL,
        responseId: expect.any(String),
        payload: { filter: expect.any(Object) } },
    );
  });

  it('to send query single store request with filter', () => {
    query$(filter().limit(50), 'STORE_ID');
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_QUERY,
        responseId: expect.any(String),
        payload: {
          filter: expect.any(Object),
          storeId: expect.any(Array),
        },
      },
    );
  });

  it('to send query multiple stores request with filter', () => {
    query$(filter().limit(50), ['STORE_ID', 'STORE_ID_2']);
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_QUERY,
        responseId: expect.any(String),
        payload: {
          filter: expect.any(Object),
          storeId: expect.any(Array),
        },
      },
    );
  });

  it('to send query multiple stores request with filter', () => {
    spatialQuery$(filter().limit(50), ['STORE_ID', 'STORE_ID_2']);
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.DATASERVICE_SPATIALQUERY,
        responseId: expect.any(String),
        payload: {
          filter: expect.any(Object),
          storeId: expect.any(Array),
        },
      },
    );
  });

  it('to send backendUri request', () => {
    backendUri$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.BACKENDSERVICE_HTTP_URI,
        responseId: expect.any(String),
      },
    );
  });

  it('to send mqttConnected request', () => {
    mqttConnected$();
    expect(NativeModules.RNSpatialConnect.handler).toHaveBeenCalledWith(
      { type: Commands.BACKENDSERVICE_MQTT_CONNECTED,
        responseId: expect.any(String),
      },
    );
  });
});
