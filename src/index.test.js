'use strict';
/*globals describe:false*/
/*globals it:false*/

import { expect } from 'chai';
import * as filter from './filter';
import { spatialFeature } from './sc.spatialfeature';
import { geometry } from './sc.geometry';
import { initialize } from './bridge';

initialize();

var isArray = function(a) {
  return Array.isArray(a);
};

describe('filter', function() {
  describe('geoBBOXContains', function() {
    var f = filter.geoBBOXContains(
      [-180, -90, 180, 90]
    );
    it('to be an array', function() {
      expect(f.$geocontains).to.be.a('array');
    });
  });

  describe('geoBBOXDisjoint', function() {
    var f = filter.geoBBOXContains(
      [-180, -90, 180, 90]
    );
    it('to be an array', function() {
      expect(f.$geocontains).to.satisfy(isArray);
    });
  });

  describe('greaterThan', function() {
    var f = filter.greaterThan('foo');
    it('to be a string', function() {
      expect(f.$gt).to.be.a('string');
    });
  });

  describe('greaterThanOrEqual', function() {
    var f = filter.greaterThanOrEqual('foo');
    it('to be a string', function() {
      expect(f.$gte).to.be.a('string');
    });
  });

  describe('lessThan', function() {
    var f = filter.lessThan('foo');
    it('to be a string', function() {
      expect(f.$lt).to.be.a('string');
    });
  });

  describe('lessThanOrEqual', function() {
    var f = filter.lessThanOrEqual('foo');
    it('to be a string', function() {
      expect(f.$lte).to.be.a('string');
    });
  });

  describe('equal', function() {
    var f = filter.equal('foo');
    it('to be a string', function() {
      expect(f.$e).to.be.a('string');
    });
  });

  describe('notEqual', function() {
    var f = filter.notEqual('foo');
    it('to be a string', function() {
      expect(f.$ne).to.be.a('string');
    });
  });

  describe('between', function() {
    var f = filter.between('foo', 'foo2');
    it('to be an object', function() {
      expect(f.$between).to.be.a('object');
    });
  });

  describe('notBetween', function() {
    var f = filter.notBetween('foo', 'foo2');
    it('to be an object', function() {
      expect(f.$notbetween).to.be.a('object');
    });
  });

  describe('in', function() {
    var f = filter.isIn(
      [-180, -90, 180, 90]
    );
    it('to be an array', function() {
      expect(f.$in).to.be.a('array');
    });
  });

  describe('notIn', function() {
    var f = filter.notIn(
      [-180, -90, 180, 90]
    );
    it('to be an array', function() {
      expect(f.$notin).to.be.a('array');
    });
  });

  describe('like', function() {
    var f = filter.like('foo');
    it('to be a string', function() {
      expect(f.$like).to.be.a('string');
    });
  });

  describe('notLike', function() {
    var f = filter.notLike('foo');
    it('to be a string', function() {
      expect(f.$notlike).to.be.a('string');
    });
  });

  describe('limit',() => {
    var f = filter.limit(100);
    it('should be 100', () => {
      expect(f.limit).to.be.a('number');
      expect(f.limit).to.equal(100);
    });
  });

  describe('layerIds',() => {
    var f = filter.layerIds(['foo','bar']);
    it('should be an array', () => {
      expect(f.layerIds).to.be.a('array');
    });
  });
});

describe('sc.spatialfeature', function() {
  var sf = spatialFeature('storeId', 'layerId', { foo: 'bar' });
  it('to be a spatialFeature', function() {
    expect(sf.properties).to.be.a('object');
    expect(sf.type).to.be.a('string');
    expect(sf.storeId).to.be.a('string');
    expect(sf.layerId).to.be.a('string');
    expect(sf.properties).to.be.a('object');
    expect(sf.properties.foo).to.equal('bar');
    expect(sf.date).to.exist;
    expect(sf.createdAt).to.exist;
    expect(sf.style).to.be.a('object');
  });
});

describe('sc.geometry', function() {
  var gj = {
    properties: {
      foo: 'bar'
    },
    geometry: {
      type: 'Point',
      coordinates: [12, 34]
    }
  };
  var g = geometry('storeId', 'layerId', gj);

  it('to be a geometry', function() {
    expect(g.properties).to.be.a('object');
    expect(g.type).to.be.a('string');
    expect(g.storeId).to.be.a('string');
    expect(g.layerId).to.be.a('string');
    expect(g.properties).to.be.a('object');
    expect(g.date).to.exist;
    expect(g.createdAt).to.exist;
    expect(g.style).to.be.a('object');
    expect(g.geometry).to.be.a('object');
  });

  it('to handle null properties', function() {
    var gj = {
      geometry: {
        type: 'Point',
        coordinates: [12, 34]
      }
    };
    var g = geometry('storeId', 'layerId', gj);
    expect(g.properties).to.be.a('object');
  });

  it('to handle null geometry', function() {
    var gj = {
    };
    var g = geometry('storeId', 'layerId', gj);
    expect(g.geometry).to.equal(null);
  });
});
