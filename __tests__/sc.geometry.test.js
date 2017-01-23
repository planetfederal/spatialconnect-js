/* globals describe:false,it:false,expect:false*/

import { geometry } from '../src/sc.geometry';

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
    expect(g.properties).toEqual(gj.properties);
    expect(g.type).toEqual('Feature');
    expect(g.storeId).toEqual('storeId');
    expect(g.layerId).toEqual('layerId');
    expect(g.date).toEqual(expect.any(Date));
    expect(g.createdAt).toEqual(expect.any(Date));
    expect(g.style).toEqual(expect.any(Object));
    expect(g.geometry).toEqual(gj.geometry);
  });

  it('to handle null properties', () => {
    const gj2 = {
      geometry: {
        type: 'Point',
        coordinates: [12, 34],
      },
    };
    const g2 = geometry('storeId', 'layerId', gj2);
    expect(g2.properties).toEqual({});
  });

  it('to handle null geometry', () => {
    const gj3 = {
    };
    const g3 = geometry('storeId', 'layerId', gj3);
    expect(g3.geometry).toBe(null);
  });

  it('to throw if no layerId provided', () => {
    expect(() => { geometry(); }).toThrow();
  });
});
