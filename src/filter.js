
/**
 * Creates a filter object
 * @class filter
 * @function
 * @example const filter = sc.filter().geoBBOXContains([-180, -90, 180, 90]).limit(50).value();
 */
export const filter = () => {
  const _filter = {};

  const returnObject = {};

  /**
   * Creates a BBOX Filter to require the query to contain
   * features inside the BBOX
   * @memberof filter.prototype
   * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
   * @returns {filter}
   */
  returnObject.geoBBOXContains = (bbox) => {
    _filter.$geocontains = bbox;
    return returnObject;
  };

  /**
   * Creates a BBOX Filter to require the query to not
   * contain features inside the BBOX
   * @memberof filter.prototype
   * @param {Array} bbox [ll_lon,ll_lat,ur_lon,ur_lat]
   * @returns {filter}
   */
  returnObject.geoBBOXDisjoint = (bbox) => {
    _filter.$geodisjoint = bbox;
    return returnObject;
  };

  /**
   * Adds filter for features only greater than the val
   * @memberof filter.prototype
   * @param {string|number} val
   * @returns {filter}
   */
  returnObject.greaterThan = (val) => {
    _filter.$gt = val;
    return returnObject;
  };

  /**
   * Adds filter for features only greater than or equal
   * to the val
   * @memberof filter.prototype
   * @param {string|number} val
   * @returns {filter}
   */
  returnObject.greaterThanOrEqual = (val) => {
    _filter.$gte = val;
    return returnObject;
  };

  /**
   * Adds filter for feature less than the val
   * @memberof filter.prototype
   * @param {string|number} val
   * @returns {filter}
   */
  returnObject.lessThan = (val) => {
    _filter.$lt = val;
    return returnObject;
  };

  /**
   * Add filter for feature less than or equal
   * to the val
   * @memberof filter.prototype
   * @param {string|number} val
   * @returns {filter}
   */
  returnObject.lessThanOrEqual = (val) => {
    _filter.$lte = val;
    return returnObject;
  };

  /**
   * Add filter for features equal to val
   * @memberof filter.prototype
   * @param {string|number} val
   * @returns {filter}
   */
  returnObject.equal = (val) => {
    _filter.$e = val;
    return returnObject;
  };

  /**
   * Add filter for features not equal
   * to val
   * @memberof filter.prototype
   * @param {string|number} val
   * @returns {filter}
   */
  returnObject.notEqual = (val) => {
    _filter.$ne = val;
    return returnObject;
  };

  /**
   * Add filter for values to only be present
   * between the upper and lower value
   * @memberof filter.prototype
   * @param {string|number} upper
   * @param {string|number} lower
   * @returns {filter}
   */
  returnObject.between = (upper, lower) => {
    _filter.$between = { upper, lower };
    return returnObject;
  };

  /**
   * Add filter for values to only be present
   * not between the upper and lower value
   * @memberof filter.prototype
   * @param {string|number} upper
   * @param {string|number} lower
   * @returns {filter}
   */
  returnObject.notBetween = (upper, lower) => {
    _filter.$notbetween = { upper, lower };
    return returnObject;
  };

  /**
   * Add filter for values present in the val
   * array
   * @memberof filter.prototype
   * @param {array} val
   * @returns {filter}
   */
  returnObject.isIn = (val) => {
    _filter.$in = val;
    return returnObject;
  };

  /**
   * Add filter for values not present in the val
   * array
   * @memberof filter.prototype
   * @param {array} val
   * @returns {filter}
   */
  returnObject.notIn = (val) => {
    _filter.$notin = val;
    return returnObject;
  };

  /**
   * Add filter for values not present in the val
   * array
   * @memberof filter.prototype
   * @param {string} val
   * @returns {filter}
   */
  returnObject.like = (val) => {
    _filter.$like = val;
    return returnObject;
  };

  /**
   * Add filter for values not present in the val
   * array
   * @memberof filter.prototype
   * @param {string} val
   * @returns {filter}
   */
  returnObject.notLike = (val) => {
    _filter.$notlike = val;
    return returnObject;
  };

  /**
   *
   * @memberof filter.prototype
   * @param {number} maxPerLayer
   * @returns {filter}
   */
  returnObject.limit = (maxPerLayer) => {
    _filter.limit = maxPerLayer;
    return returnObject;
  };

  /**
   *
   * @memberof filter.prototype
   * @param {array} layerIdsArr
   * @returns {filter}
   */
  returnObject.layerIds = (layerIdsArr) => {
    _filter.layerIds = layerIdsArr;
    return returnObject;
  };

  /**
   * Retrieves the value to send to the Mobile Bridge
   * @memberof filter.prototype
   * @returns {object}
   */
  returnObject.value = () => _filter;


  return returnObject;
};
