/* globals jest:false,describe:false,it:false,expect:false*/

jest.mock('react-native', () => ({
  NativeModules: { RNSpatialConnect: { handler: jest.fn() } },
  DeviceEventEmitter: {},
  NativeAppEventEmitter: { addListener: jest.fn() },
  Platform: { OS: 'ios' },
}), { virtual: true });

global.navigator = {};
Object.defineProperty(global.navigator, 'product', { value: 'ReactNative' });
