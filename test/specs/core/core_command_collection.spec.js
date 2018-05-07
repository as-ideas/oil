import {executeCommandCollection} from '../../../src/scripts/core/core_command_collection';
import * as CoreLog from '../../../src/scripts/core/core_log';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreConsents from '../../../src/scripts/core/core_consents';
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

  it('should process command "getVendorConsents" with callback', (done) => {
    const commandParameter = 'aParameter';
    const commandResult = 'aResult';

    spyOn(CoreConsents, 'getVendorConsentData').and.returnValue(commandResult);

    let callbackToBeInvoked = (result, success) => {
      expect(CoreConsents.getVendorConsentData).toHaveBeenCalledWith(commandParameter);
      expect(result).toEqual(commandResult);
      expect(success).toBeTruthy();
      done();
    };
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithCallback('getVendorConsents', commandParameter, callbackToBeInvoked));

    executeCommandCollection();
  });

  it('should process command "getVendorConsents" with callback and return error status', (done) => {
    const commandParameter = 'aParameter';

    spyOn(CoreConsents, 'getVendorConsentData');

    let callbackToBeInvoked = (result, success) => {
      expect(CoreConsents.getVendorConsentData).toHaveBeenCalledWith(commandParameter);
      expect(result).toEqual(undefined);
      expect(success).toBeFalsy();
      done();
    };
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithCallback('getVendorConsents', commandParameter, callbackToBeInvoked));

    executeCommandCollection();
  });

  it('should process command "getVendorConsents" from message event', (done) => {
    const commandParameter = 'aParameter';
    const commandResult = 'aResult';
    const commandCallId = 'aCallId';
    const commandEventOrigin = 'http://this.is.an.origin.de';
    let postMessageSpy = jasmine.createSpy('postMessage');

    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithEvent('getVendorConsents', commandParameter, commandCallId, commandEventOrigin, postMessageSpy));
    spyOn(CoreConsents, 'getVendorConsentData').and.returnValue(commandResult);

    executeCommandCollection();

    waitsForAndRuns(
      () => postMessageSpy.calls && postMessageSpy.calls.count() > 0,
      () => {
        expect(CoreConsents.getVendorConsentData).toHaveBeenCalledWith(commandParameter);
        expect(postMessageSpy).toHaveBeenCalledWith(givenExpectedResultMessage(commandResult, true, commandCallId), commandEventOrigin);
        done();
      },
      2000
    )
  });

  it('should process command "getVendorConsents" from message event and send error status', (done) => {
    const commandParameter = 'aParameter';
    const commandCallId = 'aCallId';
    const commandEventOrigin = 'http://this.is.an.origin.de';
    let postMessageSpy = jasmine.createSpy('postMessage');

    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithEvent('getVendorConsents', commandParameter, commandCallId, commandEventOrigin, postMessageSpy));
    spyOn(CoreConsents, 'getVendorConsentData');

    executeCommandCollection();

    waitsForAndRuns(
      () => postMessageSpy.calls && postMessageSpy.calls.count() > 0,
      () => {
        expect(CoreConsents.getVendorConsentData).toHaveBeenCalledWith(commandParameter);
        expect(postMessageSpy).toHaveBeenCalledWith(givenExpectedResultMessage(undefined, false, commandCallId), commandEventOrigin);
        done();
      },
      2000
    )
  });
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
