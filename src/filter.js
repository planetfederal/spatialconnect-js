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

/**
 * Creates a BBOX Filter to require the query to contain
 * features inside the BBOX
 * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
 */
const geoBBOXContains = (bbox) => {
  _filter.$geocontains = bbox;
  return _filter;
};

/**
 * Creates a BBOX Filter to require the query to not
 * contain features inside the BBOX
 * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
 */
const geoBBOXDisjoint = (bbox) => {
  _filter.$geodisjoint = bbox;
  return _filter;
};

/**
 * Adds filter for features only greater than the val
 *
 * @param {string/number} val
 */
const greaterThan = (val) => {
  _filter.$gt = val;
  return _filter;
};

/**
 * Adds filter for features only greater than or equal
 * to the val
 *
 * @param {string/number} val
 */
const greaterThanOrEqual = (val) => {
  _filter.$gte = val;
  return _filter;
};

/**
 * Adds filter for feature less than the val
 *
 * @param {string/number} val
 */
const lessThan = (val) => {
  _filter.$lt = val;
  return _filter;
};

/**
 * Add filter for feature less than or equal
 * to the val
 *
 * @param {string/number} val
 */
const lessThanOrEqual = (val) => {
  _filter.$lte = val;
  return _filter;
};

/**
 * Add filter for features equal to val
 *
 * @param {string/number} val
 */
const equal = (val) => {
  _filter.$e = val;
  return _filter;
};

/**
 * Add filter for features not equal
 * to val
 *
 * @param {string/number} val
 */
const notEqual = (val) => {
  _filter.$ne = val;
  return _filter;
};

/**
 * Add filter for values to only be present
 * between the upper and lower value
 *
 * @param {string/value} upper
 * @param {string/value} lower
 */
const between = (upper, lower) => {
  _filter.$between = {
    upper: upper,
    lower: lower
  };
  return _filter;
};

/**
 * Add filter for values to only be present
 * not between the upper and lower value
 *
 * @param {string/value} upper
 * @param {string/value} lower
 */
const notBetween = (upper, lower) => {
  _filter.$notbetween = {
    upper: upper,
    lower: lower
  };
  return _filter;
};

/**
 * Add filter for values present in the val
 * array
 *
 * @param {array} val
 */
const isIn = (val) => {
  _filter.$in = val;
  return _filter;
};

/**
 * Add filter for values not present in the val
 * array
 *
 * @param {array} val
 */
const notIn = (val) => {
  _filter.$notin = val;
  return _filter;
};

/**
 * Add filter for values not present in the val
 * array
 *
 * @param {string} val
 */
const like = (val) => {
  _filter.$like = val;
  return _filter;
};

/**
 * Add filter for values not present in the val
 * array
 *
 * @param {string} val
 */
const notLike = (val) => {
  _filter.$notlike = val;
  return _filter;
};

export {
  geoBBOXContains,
  geoBBOXDisjoint,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  equal,
  notEqual,
  between,
  notBetween,
  isIn,
  notIn,
  like,
  notLike
};
