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

import defaults from 'lodash/defaults';
import { spatialFeature } from './sc.spatialfeature';

/**
 * Create a geometry that is associated with a specific store and layer.
 * @function
 * @param {string} storeId
 * @param {string} layerId
 * @param {object} gj - A geojson feature
 * @returns {object} the geometry serialized to a geojson feauture
 */
export function geometry(storeId, layerId, gj) {
  let scGeometry = Object.create(spatialFeature(storeId, layerId, gj));

  const baseFeature = Object.getPrototypeOf(scGeometry);
  scGeometry = defaults(gj, baseFeature);

  if (scGeometry.geometry === undefined) {
    scGeometry.geometry = null;
  }

  scGeometry.serialize = function () {
    const obj = {};
    obj.type = this.type;
    obj.storeId = this.storeId;
    obj.layerId = this.layerId;
    obj.properties = this.properties;
    obj.date = this.date;
    obj.createdAt = this.createdAt;
    obj.style = this.style;
    obj.geometry = this.geometry;
    return obj;
  };

  return scGeometry.serialize();
}
