
/* globals describe:false*/
/* globals it:false*/

import { expect } from 'chai';
import { filter } from './filter';
import { spatialFeature } from './sc.spatialfeature';
import { geometry } from './sc.geometry';
import { initialize } from './bridge';

initialize();

describe('filter', () => {
  describe('geoBBOXContains', () => {
    const f = filter().geoBBOXContains([-180, -90, 180, 90]).value();
    it('to be an array', () => {
      expect(f.$geocontains).to.be.a('array');
    });
  });

  describe('geoBBOXDisjoint', () => {
    const f = filter().geoBBOXContains([-180, -90, 180, 9000]).value();
    it('to be an array', () => {
      expect(f.$geocontains).to.satisfy(Array.isArray);
    });
  });

  describe('greaterThan', () => {
    const f = filter().greaterThan('foo').value();
    it('to be a string', () => {
      expect(f.$gt).to.be.a('string');
    });
  });

  describe('greaterThanOrEqual', () => {
    const f = filter().greaterThanOrEqual('foo').value();
    it('to be a string', () => {
      expect(f.$gte).to.be.a('string');
    });
  });

  describe('lessThan', () => {
    const f = filter().lessThan('foo').value();
    it('to be a string', () => {
      expect(f.$lt).to.be.a('string');
    });
  });

  describe('lessThanOrEqual', () => {
    const f = filter().lessThanOrEqual('foo').value();
    it('to be a string', () => {
      expect(f.$lte).to.be.a('string');
    });
  });

  describe('equal', () => {
    const f = filter().equal('foo').value();
    it('to be a string', () => {
      expect(f.$e).to.be.a('string');
    });
  });

  describe('notEqual', () => {
    const f = filter().notEqual('foo').value();
    it('to be a string', () => {
      expect(f.$ne).to.be.a('string');
    });
  });

  describe('between', () => {
    const f = filter().between('foo', 'foo2').value();
    it('to be an object', () => {
      expect(f.$between).to.be.a('object');
    });
  });

  describe('notBetween', () => {
    const f = filter().notBetween('foo', 'foo2').value();
    it('to be an object', () => {
      expect(f.$notbetween).to.be.a('object');
    });
  });

  describe('in', () => {
    const f = filter().isIn([-180, -90, 180, 90]).value();
    it('to be an array', () => {
      expect(f.$in).to.be.a('array');
    });
  });

  describe('notIn', () => {
    const f = filter().notIn([-180, -90, 180, 90]).value();
    it('to be an array', () => {
      expect(f.$notin).to.be.a('array');
    });
  });

  describe('like', () => {
    const f = filter().like('foo').value();
    it('to be a string', () => {
      expect(f.$like).to.be.a('string');
    });
  });

  describe('notLike', () => {
    const f = filter().notLike('foo').value();
    it('to be a string', () => {
      expect(f.$notlike).to.be.a('string');
    });
  });

  describe('limit', () => {
    const f = filter().limit(250).value();
    it('should be 250', () => {
      expect(f.limit).to.be.a('number');
      expect(f.limit).to.equal(250);
    });
  });

  describe('layerIds', () => {
    const f = filter().layerIds(['foo', 'bar']).value();
    it('should be an array', () => {
      expect(f.layerIds).to.be.a('array');
    });
  });

  describe('limit and layers', () => {
    const f = filter().layerIds(['foo', 'bar2']).limit(250).value();
    it('Should have multiple filters', () => {
      expect(f.layerIds).to.be.a('array');
      expect(f.limit).to.be.a('number');
      expect(f.limit).to.equal(250);
    });
  });

  describe('filter creation', () => {
    const f = filter().layerIds(['foo', 'bar']).value();
    it('should have on property', () => {
      expect(Object.keys(f)).to.have.length(1);
    });
  });
});

describe('sc.spatialfeature', () => {
  const sf = spatialFeature('storeId', 'layerId', { foo: 'bar' });
  it('to be a spatialFeature', () => {
    expect(sf.properties).to.be.a('object');
    expect(sf.type).to.be.a('string');
    expect(sf.storeId).to.be.a('string');
    expect(sf.layerId).to.be.a('string');
    expect(sf.properties).to.be.a('object');
    expect(sf.properties.foo).to.equal('bar');
    // expect(sf.date).to.exist;
    // expect(sf.createdAt).to.exist;
    expect(sf.style).to.be.a('object');
  });
});

describe('sc.geometry', () => {
  const gj = {
    properties: {
      foo: 'bar',
    },
    geometry: {
      type: 'Point',
      coordinates: [12, 34],
    },
  };
  const g = geometry('storeId', 'layerId', gj);

  it('to be a geometry', () => {
    expect(g.properties).to.be.a('object');
    expect(g.type).to.be.a('string');
    expect(g.storeId).to.be.a('string');
    expect(g.layerId).to.be.a('string');
    expect(g.properties).to.be.a('object');
    // expect(g.date).to.exist;
    // expect(g.createdAt).to.exist;
    expect(g.style).to.be.a('object');
    expect(g.geometry).to.be.a('object');
  });

  it('to handle null properties', () => {
    const gj2 = {
      geometry: {
        type: 'Point',
        coordinates: [12, 34],
      },
    };
    const g2 = geometry('storeId', 'layerId', gj2);
    expect(g2.properties).to.be.a('object');
  });

  it('to handle null geometry', () => {
    const gj3 = {
    };
    const g3 = geometry('storeId', 'layerId', gj3);
    expect(g3.geometry).to.equal(null);
  });
});
