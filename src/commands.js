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

import commands from './schema/actions.json';

export const Commands = commands;

export const AuthStatus = {
  SCAUTH_AUTHENTICATED: 1,
  SCAUTH_NOT_AUTHENTICATED: 0
};

export const StoreStatus = {
  SC_DATASTORE_STARTED: 0,
  SC_DATASTORE_RUNNING: 1,
  SC_DATASTORE_PAUSED: 2,
  SC_DATASTORE_STOPPED: 3,
  SC_DATASTORE_DOWNLOADINGDATA: 4
};
