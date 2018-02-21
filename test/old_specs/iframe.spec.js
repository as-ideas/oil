import { addFrame } from '../../src/scripts/iframe';

describe('iframe', () => {

  it('should add iframe', () => {
    let iframe = addFrame();
    expect(iframe).toBeDefined();
  });

});
