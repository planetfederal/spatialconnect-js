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

import * as _ from 'lodash';

export function spatialFeature(storeId, layerId, featureProps) {
  if (layerId === undefined) {
    throw new Error('layerId must be defined for all spatial features.');
  }

  const defaultObj = {
    date: new Date(),
    createdAt: new Date(),
    properties: {},
    storeId,
    layerId,
    style: {},
    type: 'Feature',
  };

  const sf = _.defaults({ properties: featureProps }, defaultObj);

  sf.serialize = function () {
    const obj = {};
    obj.type = this.type;
    obj.storeId = this.storeId;
    obj.layerId = this.layerId;
    obj.properties = this.properties;
    obj.date = this.date;
    obj.createdAt = this.createdAt;
    obj.style = this.style;
    return obj;
  };
  return sf;
}
