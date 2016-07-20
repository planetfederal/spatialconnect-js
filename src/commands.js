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

export const Commands = {
  START_ALL_SERVICES: 1,
  DATASERVICE_ACTIVESTORESLIST: 100,
  DATASERVICE_ACTIVESTOREBYID: 101,
  DATASERVICE_SPATIALQUERY: 110,
  DATASERVICE_SPATIALQUERYALL: 111,
  DATASERVICE_GEOSPATIALQUERY: 112,
  DATASERVICE_GEOSPATIALQUERYALL: 113,
  DATASERVICE_CREATEFEATURE: 114,
  DATASERVICE_UPDATEFEATURE: 115,
  DATASERVICE_DELETEFEATURE: 116,
  DATASERVICE_FORMSLIST: 117,
  SENSORSERVICE_GPS: 200,
  AUTHSERVICE_AUTHENTICATE: 300,
  AUTHSERVICE_LOGOUT: 301,
  AUTHSERVICE_ACCESS_TOKEN: 302,
  AUTHSERVICE_LOGIN_STATUS: 303
};

export const AuthStatus = {
  SCAUTH_AUTHENTICATED: 0,
  SCAUTH_NOT_AUTHENTICATED: 1
};
