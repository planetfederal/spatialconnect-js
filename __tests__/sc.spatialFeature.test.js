/* globals describe:false,it:false,expect:false*/

import { spatialFeature } from '../src/sc.spatialfeature';

describe('sc.spatialfeature', () => {
  const f = {
    properties: { foo: 'bar' },
  };
  const sf = spatialFeature('storeId', 'layerId', f);
  it('to be a spatialFeature', () => {
    expect(sf.properties).toEqual(f.properties);
    expect(sf.type).toEqual('Feature');
    expect(sf.storeId).toEqual('storeId');
    expect(sf.layerId).toEqual('layerId');
    expect(sf.date).toEqual(expect.any(Date));
    expect(sf.createdAt).toEqual(expect.any(Date));
    expect(sf.style).toEqual(expect.any(Object));
  });

  const styledFeature = {
    properties: { foo: 'bar' },
    style: { fillColor: '#f00' },
  };
  const sf2 = spatialFeature('storeId', 'layerId', styledFeature);
  it('to inherit styles', () => {
    expect(sf2.properties).toEqual(f.properties);
    expect(sf2.style).toEqual(styledFeature.style);
  });

  it('to throw if no layerId provided', () => {
    expect(() => { spatialFeature(); }).toThrow();
  });
});
