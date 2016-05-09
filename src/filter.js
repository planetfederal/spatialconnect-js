'use strict';

export default function() {
  var filter = Object.create(null);
  var returnObject = {};

  /**
   * Creates a BBOX Filter to require the query to contain
   * features inside the BBOX
   * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
   */
  returnObject.geoBBOXContains = (bbox) => {
    filter.$geocontains = bbox;
    return returnObject;
  };

  /**
   * Creates a BBOX Filter to require the query to not
   * contain features inside the BBOX
   * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
   */
  returnObject.geoBBOXDisjoint = (bbox) => {
    filter.$geodisjoint = bbox;
    return returnObject;
  };

  /**
   * Adds filter for features only greater than the val
   *
   * @param {string/number} val
   */
  returnObject.greaterThan = (val) => {
    filter.$gt = val;
    return returnObject;
  };

  /**
   * Adds filter for features only greater than or equal
   * to the val
   *
   * @param {string/number} val
   */
  returnObject.greaterThanOrEqual = (val) => {
    filter.$gte = val;
    return returnObject;
  };

  /**
   * Adds filter for feature less than the val
   *
   * @param {string/number} val
   */
  returnObject.lessThan = (val) => {
    filter.$lt = val;
    return returnObject;
  };

  /**
   * Add filter for feature less than or equal
   * to the val
   *
   * @param {string/number} val
   */
  returnObject.lessThanOrEqual = (val) => {
    filter.$lte = val;
    return returnObject;
  };

  /**
   * Add filter for features equal to val
   *
   * @param {string/number} val
   */
  returnObject.equal = (val) => {
    filter.$e = val;
    return returnObject;
  };

  /**
   * Add filter for features not equal
   * to val
   *
   * @param {string/number} val
   */
  returnObject.notEqual = (val) => {
    filter.$ne = val;
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
    filter.$between = {
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
    filter.$notbetween = {
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
  returnObject.in = (val) => {
    filter.$in = val;
    return returnObject;
  };

  /**
   * Add filter for values not present in the val
   * array
   *
   * @param {array} val
   */
  returnObject.notIn = (val) => {
    filter.$notin = val;
    return returnObject;
  };

  /**
   * Add filter for values not present in the val
   * array
   *
   * @param {string} val
   */
  returnObject.like = (val) => {
    filter.$like = val;
    return returnObject;
  };

  /**
   * Add filter for values not present in the val
   * array
   *
   * @param {string} val
   */
  returnObject.notLike = (val) => {
    filter.$notlike = val;
    return returnObject;
  };

  /**
   * Retrieves the value to send to the Mobile Bridge
   */
  returnObject.value = () => {
    return filter;
  };
  return returnObject;
}
