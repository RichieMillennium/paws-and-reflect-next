import { sharedApi } from './shared-api';

describe('sharedApi', () => {
  it('should work', () => {
    expect(sharedApi()).toEqual('shared-api');
  });
});
