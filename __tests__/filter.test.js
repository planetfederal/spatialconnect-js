/* globals describe:false,it:false,expect:false*/

import { filter } from '../src/filter';

describe('geoBBOXContains', () => {
  const bbox = [-180, -90, 180, 90];
  const f = filter().geoBBOXContains(bbox).value();
  it('to be an array', () => {
    expect(f.$geocontains).toBe(bbox);
  });
});

describe('geoBBOXDisjoint', () => {
  const f = filter().geoBBOXContains([-180, -90, 180, 9000]).value();
  it('to be an array', () => {
    expect(f.$geocontains).toBeInstanceOf(Array);
  });
});

describe('greaterThan', () => {
  const f = filter().greaterThan('foo').value();
  it('to be a string', () => {
    expect(f.$gt).toBe('foo');
  });
});

describe('greaterThanOrEqual', () => {
  const f = filter().greaterThanOrEqual('foo').value();
  it('to be a string', () => {
    expect(f.$gte).toBe('foo');
  });
});

describe('lessThan', () => {
  const f = filter().lessThan('foo').value();
  it('to be a string', () => {
    expect(f.$lt).toBe('foo');
  });
});

describe('lessThanOrEqual', () => {
  const f = filter().lessThanOrEqual('foo').value();
  it('to be a string', () => {
    expect(f.$lte).toBe('foo');
  });
});

describe('equal', () => {
  const f = filter().equal('foo').value();
  it('to be a string', () => {
    expect(f.$e).toBe('foo');
  });
});

describe('notEqual', () => {
  const f = filter().notEqual('foo').value();
  it('to be a string', () => {
    expect(f.$ne).toBe('foo');
  });
});

describe('between', () => {
  const f = filter().between('foo', 'foo2').value();
  it('to be an object', () => {
    expect(f.$between).toBeInstanceOf(Object);
  });
});

describe('notBetween', () => {
  const f = filter().notBetween('foo', 'foo2').value();
  it('to be an object', () => {
    expect(f.$notbetween).toBeInstanceOf(Object);
  });
});

describe('in', () => {
  const f = filter().isIn([-180, -90, 180, 90]).value();
  it('to be an array', () => {
    expect(f.$in).toBeInstanceOf(Array);
  });
});

describe('notIn', () => {
  const f = filter().notIn([-180, -90, 180, 90]).value();
  it('to be an array', () => {
    expect(f.$notin).toBeInstanceOf(Array);
  });
});

describe('like', () => {
  const f = filter().like('foo').value();
  it('to be a string', () => {
    expect(f.$like).toBe('foo');
  });
});

describe('notLike', () => {
  const f = filter().notLike('foo').value();
  it('to be a string', () => {
    expect(f.$notlike).toBe('foo');
  });
});

describe('limit', () => {
  const f = filter().limit(250).value();
  it('should be 250', () => {
    expect(f.limit).toEqual(250);
  });
});

describe('layerIds', () => {
  const f = filter().layerIds(['foo', 'bar']).value();
  it('should be an array', () => {
    expect(f.layerIds).toBeInstanceOf(Array);
  });
});

describe('limit and layers', () => {
  const f = filter().layerIds(['foo', 'bar2']).limit(250).value();
  it('Should have multiple filters', () => {
    expect(f.layerIds).toBeInstanceOf(Array);
    expect(f.limit).toEqual(250);
  });
});

describe('filter creation', () => {
  const f = filter().layerIds(['foo', 'bar']).value();
  it('should have on property', () => {
    expect(Object.keys(f)).toHaveLength(1);
  });
});
