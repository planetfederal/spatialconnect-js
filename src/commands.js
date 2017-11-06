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

import commands from './schema/actions.json';

export const Commands = commands;

export const AuthStatus = {
  SCAUTH_AUTHENTICATED: 1,
  SCAUTH_NOT_AUTHENTICATED: 0,
};

export const StoreStatus = {
  SC_DATASTORE_STARTED: 0,
  SC_DATASTORE_RUNNING: 1,
  SC_DATASTORE_PAUSED: 2,
  SC_DATASTORE_STOPPED: 3,
  SC_DATASTORE_DOWNLOADINGDATA: 4,
};

/**
 * An event received by the xAccessToken$ observable
 * @event AccessTokenEvent
 * @type {object}
 * @property {string} type - AUTHSERVICE_ACCESS_TOKEN
 * @property {string} payload - a json web token
 */

/**
 *
 * @event LoginStatusEvent
 * @type {object}
 * @property {string} type - AUTHSERVICE_LOGIN_STATUS
 * @property {number} payload - SCAUTH_AUTHENTICATED or SCAUTH_NOT_AUTHENTICATED
 */

/**
 *
 * @event NotificationEvent
 * @type {object}
 * @property {string} type - NOTIFICATIONS
 * @property {object} payload - A SpatialConnect Notification
 */

/**
 *
 * @event GPSEvent
 * @type {object}
 * @property {string} type - NOTIFICATIONS
 * @property {object} payload - A GPS point
 * @property {number} payload.latitude
 * @property {number} payload.longitude
 * @property {number} payload.altitude
 */

/**
 *
 * @event StoreListEvent
 * @type {object}
 * @property {string} type - DATASERVICE_STORELIST
 * @property {array} payload - The list of stores
 */

/**
 *
 * @event ActiveStoreListEvent
 * @type {object}
 * @property {string} type - DATASERVICE_ACTIVESTORESLIST
 * @property {array} payload - The list of active stores
 */

/**
 *
 * @event FormListEvent
 * @type {object}
 * @property {string} type - DATASERVICE_FORMLIST
 * @property {array} payload - The list of forms
 */

/**
 *
 * @event CreateFeatureEvent
 * @type {object}
 * @property {string} type - DATASERVICE_CREATEFEATURE
 * @property {object} payload - The feature that was added to the data store
 */

/**
 *
 * @event UpdateFeatureEvent
 * @type {object}
 * @property {string} type - DATASERVICE_UPDATEFEATURE
 * @property {object} payload - The feature that was updated
 */

/**
 *
 * @event BackendHTTPURIEvent
 * @type {object}
 * @property {string} type - BACKENDSERVICE_HTTP_URI
 * @property {object} payload
 * @property {string} payload.backendUri
 */

/**
 *
 * @event BackendConnectedEvent
 * @type {object}
 * @property {string} type - BACKENDSERVICE_CONNECTED
 * @property {object} payload
 * @property {number} payload.connected - 0 = not connected, 1 = connected
 */
