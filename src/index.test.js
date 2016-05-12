'use strict';
/*globals describe:false*/
/*globals it:false*/

import { expect } from 'chai';
import filter from './filter';
import { initialize } from './bridge';

initialize();

var isArray = function(a) {
  return Array.isArray(a);
};

describe('filter', function() {
  describe('geoBBOXContains', function() {
    var f = filter().geoBBOXContains(
      [-180, -90, 180, 90]
    );
    var val = f.value();
    it('to be an array', function() {
      expect(val.$geocontains).to.be.a('array');
    });
  });

  describe('geoBBOXDisjoint', function() {
    var f = filter().geoBBOXContains(
      [-180, -90, 180, 90]
    );
    var val = f.value();
    it('to be an array', function() {
      expect(val.$geocontains).to.satisfy(isArray);
    });
  });

  describe('greaterThan', function() {
    var f = filter().greaterThan('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$gt).to.be.a('string');
    });
  });

  describe('greaterThanOrEqual', function() {
    var f = filter().greaterThanOrEqual('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$gte).to.be.a('string');
    });
  });

  describe('lessThan', function() {
    var f = filter().lessThan('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$lt).to.be.a('string');
    });
  });

  describe('lessThanOrEqual', function() {
    var f = filter().lessThanOrEqual('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$lte).to.be.a('string');
    });
  });

  describe('equal', function() {
    var f = filter().equal('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$e).to.be.a('string');
    });
  });

  describe('notEqual', function() {
    var f = filter().notEqual('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$ne).to.be.a('string');
    });
  });

  describe('between', function() {
    var f = filter().between('foo', 'foo2');
    var val = f.value();
    it('to be an object', function() {
      expect(val.$between).to.be.a('object');
    });
  });

  describe('notBetween', function() {
    var f = filter().notBetween('foo', 'foo2');
    var val = f.value();
    it('to be an object', function() {
      expect(val.$notbetween).to.be.a('object');
    });
  });

  describe('in', function() {
    var f = filter().in(
      [-180, -90, 180, 90]
    );
    var val = f.value();
    it('to be an array', function() {
      expect(val.$in).to.be.a('array');
    });
  });

  describe('notIn', function() {
    var f = filter().notIn(
      [-180, -90, 180, 90]
    );
    var val = f.value();
    it('to be an array', function() {
      expect(val.$notin).to.be.a('array');
    });
  });

  describe('like', function() {
    var f = filter().like('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$like).to.be.a('string');
    });
  });

  describe('notLike', function() {
    var f = filter().notLike('foo');
    var val = f.value();
    it('to be a string', function() {
      expect(val.$notlike).to.be.a('string');
    });
  });
});
