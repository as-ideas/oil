import { waitsForAndRuns } from '../test-utils/utils_wait.js';

describe('oil stub', () => {

  beforeEach(() => {
    if (window.__cmp) {
      window.__cmp.commandCollection.length = 0;
    }
    window['AS_OIL'] = undefined;
  });

  it('should define __cmp() function', () => {
    expect(window.__cmp).toBeDefined();
  });

  it('should define __cmp() function that can handle ping request', (done) => {
    window.__cmp('ping', null, (pingArgs) => {
      expect(pingArgs).toBeDefined();
      expect(pingArgs.gdprAppliesGlobally).toEqual(false);
      expect(pingArgs.cmpLoaded).toEqual(false);
      done();
    });
  });

  it('should define __cmp() function that queues callbacks', () => {
    let expectedCommand = 'aCallThatIsNotPing';
    let expectedParameters = {key: 'value'};
    let expectedCallback = () => {
    };

    window.__cmp(expectedCommand, expectedParameters, expectedCallback);

    expect(window.__cmp.commandCollection).toBeDefined();
    expect(window.__cmp.commandCollection.length).toBe(1);
    expect(window.__cmp.commandCollection[0]).toBeDefined();
    expect(window.__cmp.commandCollection[0].command).toBe(expectedCommand);
    expect(window.__cmp.commandCollection[0].parameter).toBe(expectedParameters);
    expect(window.__cmp.commandCollection[0].callback).toBe(expectedCallback);
  });

  it('should define __cmp() function that invokes command collection execution if oil layer is loaded', (done) => {
    window['AS_OIL'] = {};
    window['AS_OIL']['commandCollectionExecutor'] = () => {
      expect(window.__cmp.commandCollection).toBeDefined();
      expect(window.__cmp.commandCollection.length).toBe(1);
      done();
    };
    window.__cmp('aCallThatIsNotPing', {key: 'value'}, () => {
    });
  });

  it('should register eventHandler for __cmpCall messages', (done) => {
    spyOn(window.__cmp, 'receiveMessage').and.callThrough();

    let eventData = {
      __cmpCall: {
        callId: 1,
        command: 'aCommand',
        parameter: 'aParameter'
      }
    };
    let event = new MessageEvent('message', {data: eventData});

    window.dispatchEvent(event);

    waitsForAndRuns(() => {
      return window.__cmp.receiveMessage.calls.count() > 0 && window.__cmp.commandCollection.length > 0;
    }, () => {
      expect(window.__cmp.commandCollection).toBeDefined();
      expect(window.__cmp.commandCollection.length).toBe(1);
      expect(window.__cmp.commandCollection[0]).toBeDefined();
      expect(window.__cmp.commandCollection[0].callId).toBe(eventData.__cmpCall.callId);
      expect(window.__cmp.commandCollection[0].command).toBe(eventData.__cmpCall.command);
      expect(window.__cmp.commandCollection[0].parameter).toBe(eventData.__cmpCall.parameter);
      expect(window.__cmp.commandCollection[0].event).toBe(event);
      done();
    }, 2000);
  });

  it('should add cmpLocator iframe', () => {
    let frames = document.getElementsByName('__cmpLocator');
    expect(frames.length).toEqual(1);
    expect(frames[0].style.display).toEqual('none');
    expect(frames[0].parentElement.nodeName).toEqual('BODY');
  });

});
