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

let _filter = Object.create(null);
let returnObject = {};

/**
 * Creates a BBOX Filter to require the query to contain
 * features inside the BBOX
 * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
 */
returnObject.geoBBOXContains = (bbox) => {
  _filter.$geocontains = bbox;
  return returnObject;
};

/**
 * Creates a BBOX Filter to require the query to not
 * contain features inside the BBOX
 * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
 */
returnObject.geoBBOXDisjoint = (bbox) => {
  _filter.$geodisjoint = bbox;
  return returnObject;
};

/**
 * Adds filter for features only greater than the val
 *
 * @param {string/number} val
 */
returnObject.greaterThan = (val) => {
  _filter.$gt = val;
  return returnObject;
};

/**
 * Adds filter for features only greater than or equal
 * to the val
 *
 * @param {string/number} val
 */
returnObject.greaterThanOrEqual = (val) => {
  _filter.$gte = val;
  return returnObject;
};

/**
 * Adds filter for feature less than the val
 *
 * @param {string/number} val
 */
returnObject.lessThan = (val) => {
  _filter.$lt = val;
  return returnObject;
};

/**
 * Add filter for feature less than or equal
 * to the val
 *
 * @param {string/number} val
 */
returnObject.lessThanOrEqual = (val) => {
  _filter.$lte = val;
  return returnObject;
};

/**
 * Add filter for features equal to val
 *
 * @param {string/number} val
 */
returnObject.equal = (val) => {
  _filter.$e = val;
  return returnObject;
};

/**
 * Add filter for features not equal
 * to val
 *
 * @param {string/number} val
 */
returnObject.notEqual = (val) => {
  _filter.$ne = val;
  return returnObject;
};

/**
 * Add filter for values to only be present
 * between the upper and lower value
 *
 * @param {string/value} upper
 * @param {string/value} lower
 */
returnObject.between = (upper, lower) => {
  _filter.$between = {
    upper: upper,
    lower: lower
  };
  return returnObject;
};

/**
 * Add filter for values to only be present
 * not between the upper and lower value
 *
 * @param {string/value} upper
 * @param {string/value} lower
 */
returnObject.notBetween = (upper, lower) => {
  _filter.$notbetween = {
    upper: upper,
    lower: lower
  };
  return returnObject;
};

/**
 * Add filter for values present in the val
 * array
 *
 * @param {array} val
 */
returnObject.isIn = (val) => {
  _filter.$in = val;
  return returnObject;
};

/**
 * Add filter for values not present in the val
 * array
 *
 * @param {array} val
 */
returnObject.notIn = (val) => {
  _filter.$notin = val;
  return returnObject;
};

/**
 * Add filter for values not present in the val
 * array
 *
 * @param {string} val
 */
returnObject.like = (val) => {
  _filter.$like = val;
  return returnObject;
};

/**
 * Add filter for values not present in the val
 * array
 *
 * @param {string} val
 */
returnObject.notLike = (val) => {
  _filter.$notlike = val;
  return returnObject;
};

/**
 * 
 *
 * @param {number} maxPerLayer
 */
returnObject.limit = (maxPerLayer) => {
  _filter.limit = maxPerLayer;
  return returnObject;
};

/**
 *
 *
 * @param {array} layerIdsArr
 */
returnObject.layerIds = (layerIdsArr) => {
  _filter.layerIds = layerIdsArr;
  return returnObject;
};

returnObject.value = () => {
  return _filter;
};

export { returnObject as filter };
