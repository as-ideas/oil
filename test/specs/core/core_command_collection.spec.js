import {executeCommandCollection} from '../../../src/scripts/core/core_command_collection';
import * as CoreLog from '../../../src/scripts/core/core_log';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreConsents from '../../../src/scripts/core/core_consents';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import {getVendorConsentData} from '../../../src/scripts/core/core_consents';
import {waitsForAndRuns} from '../../utils';

describe('command collection executor', () => {

  it('should log error if command collection contains invalid command that is not a function', (done) => {
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(['thisIsNotAFunction']);
    spyOn(CoreLog, 'logError').and.callThrough();

    executeCommandCollection();
    waitsForAndRuns(
      wasErrorLogged('Invalid CMP command'),
      () => {
        expect(CoreLog.logError).toHaveBeenCalled();
        done();
      },
      5000
    );
  });

  it('should log error if command collection contains invalid command that does not have callback and callId', (done) => {
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue([{
      command: "getVendorConsents",
      parameter: "aParameter"
    }]);
    spyOn(CoreLog, 'logError').and.callThrough();
    spyOn(CoreConsents, 'getVendorConsentData').and.returnValue('aResult');

    executeCommandCollection();
    waitsForAndRuns(
      wasErrorLogged('Invalid command entry'),
      () => {
        expect(CoreLog.logError).toHaveBeenCalled();
        done();
      },
      5000
    );
  });

  describe('getPublisherConsents', () => {

    it('should process command', (done) => {
      verifyInvocationOfCommandWithCallback('getPublisherConsents', CoreConsents.getPublisherConsentData, 'aResult', done);
    });

    it('should process command with callback and return error status', (done) => {
      verifyInvocationOfCommandWithCallback('getPublisherConsents', CoreConsents.getPublisherConsentData, undefined, done);
    });

    it('should process command from message event', (done) => {
      verifyInvocationOfCommandWithCallId('getPublisherConsents', CoreConsents.getPublisherConsentData, 'aResult', done);
    });

  });
 
  describe('getVendorConsents', () => {

    it('should process command "getVendorConsents" from message event and send error status', (done) => {
      verifyInvocationOfCommandWithCallId('getVendorConsents', CoreConsents.getVendorConsentData, undefined, done);
    });

    it('should process command "getVendorConsents" with callback', (done) => {
      verifyInvocationOfCommandWithCallback('getVendorConsents', CoreConsents.getVendorConsentData, 'aResult', done);
    });

    it('should process command "getVendorConsents" with callback and return error status', (done) => {
      verifyInvocationOfCommandWithCallback('getVendorConsents', CoreConsents.getVendorConsentData, undefined, done);
    });

    it('should process command "getVendorConsents" from message event', (done) => {
      verifyInvocationOfCommandWithCallId('getVendorConsents', CoreConsents.getVendorConsentData, 'aResult', done);
    });

    it('should process command "getVendorConsents" from message event and send error status', (done) => {
      verifyInvocationOfCommandWithCallId('getVendorConsents', CoreConsents.getVendorConsentData, undefined, done);
    });

  });

  describe('getVendorConsents', function() {

    it('should process command "getVendorConsents" with callback and return error status', (done) => {
      verifyInvocationOfCommandWithCallback('getConsentData', CoreConsents.getConsentDataString, undefined, done);
    });

    it('should process command "getVendorConsents" from message event', (done) => {
      verifyInvocationOfCommandWithCallId('getConsentData', CoreConsents.getConsentDataString, 'aResult', done);
    });

    it('should process command "getVendorConsents" from message event and send error status', (done) => {
      verifyInvocationOfCommandWithCallId('getConsentData', CoreConsents.getConsentDataString, undefined, done);
    });
  });

  it('should process command "getConsentData" with callback', (done) => {
    verifyInvocationOfCommandWithCallback('getConsentData', CoreConsents.getConsentDataString, 'aResult', done);
  });

  it('should process command "getVendorlist" with callback', (done) => {
    verifyInvocationOfCommandWithCallback('getVendorlist', CoreVendorInformation.getVendorlist, 'aResult', done);
  });

  it('should process single command if command entry is given as parameter', (done) => {
    const commandParameter = 'aParameter';
    const commandToBeExecuted = 'getVendorConsents';
    const expectedFunction = CoreConsents.getVendorConsentData;
    const expectedResult = 'aResult';

    let notInvokedCallback = () => {
      fail();
    };
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithCallback(commandToBeExecuted, commandParameter, notInvokedCallback));

    spyOn(CoreConsents, expectedFunction.name).and.returnValue(expectedResult);
    let callbackToBeInvoked = (result, success) => {
      expect(CoreConsents[expectedFunction.name]).toHaveBeenCalledWith(commandParameter);
      expect(result).toEqual(expectedResult);
      if (typeof expectedResult !== 'undefined') {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
      done();
    };

    executeCommandCollection({
      command: commandToBeExecuted,
      parameter: commandParameter,
      callback: callbackToBeInvoked,
    });
  });

  function verifyInvocationOfCommandWithCallback(command, expectedFunction, expectedResult, done) {
    const commandParameter = 'aParameter';

    spyOn(CoreConsents, expectedFunction.name).and.returnValue(expectedResult);

    let callbackToBeInvoked = (result, success) => {
      expect(CoreConsents[expectedFunction.name]).toHaveBeenCalledWith(commandParameter);
      expect(result).toEqual(expectedResult);
      if (typeof expectedResult !== 'undefined') {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
      done();
    };
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithCallback(command, commandParameter, callbackToBeInvoked));

    executeCommandCollection();
  }

  function verifyInvocationOfCommandWithCallId(command, expectedFunction, expectedResult, done) {
    const commandParameter = 'aParameter';
    const commandCallId = 'aCallId';
    const commandEventOrigin = 'http://this.is.an.origin.de';
    let postMessageSpy = jasmine.createSpy('postMessage');

    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithEvent(command, commandParameter, commandCallId, commandEventOrigin, postMessageSpy));
    spyOn(CoreConsents, expectedFunction.name).and.returnValue(expectedResult);

    executeCommandCollection();

    waitsForAndRuns(
      () => postMessageSpy.calls && postMessageSpy.calls.count() > 0,
      () => {
        expect(CoreConsents[expectedFunction.name]).toHaveBeenCalledWith(commandParameter);
        expect(postMessageSpy).toHaveBeenCalledWith(givenExpectedResultMessage(expectedResult, typeof expectedResult !== 'undefined', commandCallId), commandEventOrigin);
        done();
      },
      2000
    );
  }

  function givenCommandEntryWithCallback(commandToBeExecuted, commandParameter, callbackToBeInvoked) {
    return [{
      command: commandToBeExecuted,
      parameter: commandParameter,
      callback: callbackToBeInvoked,
    }];
  }

  function givenCommandEntryWithEvent(commandToBeExecuted, commandParameter, commandCallId, commandEventOrigin, postMessageSpy) {
    return [{
      command: commandToBeExecuted,
      parameter: commandParameter,
      callId: commandCallId,
      event: {
        origin: commandEventOrigin,
        source: {
          postMessage: postMessageSpy
        }
      }
    }];
  }

  function givenExpectedResultMessage(commandResult, commandSuccess, commandCallId) {
    return {
      __cmpReturn: {
        returnValue: commandResult,
        success: commandSuccess,
        callId: commandCallId
      }
    };
  }

  function wasErrorLogged(expectedLogMessage) {
    return () => {
      let calls = CoreLog.logError.calls;

      if (typeof calls !== 'undefined') {
        if (typeof expectedLogMessage === 'undefined') {
          return calls.count() > 0;
        } else {
          return calls.count() > 0 && calls.all().filter(
            call => call.args.length > 0 && call.args[0].indexOf(expectedLogMessage) !== -1
          ).length > 0;
        }
      }
      return false;
    }
  }

});
