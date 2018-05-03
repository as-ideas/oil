import {executeCommandCollection} from '../../../src/scripts/core/core_command_collection';
import * as CoreLog from '../../../src/scripts/core/core_log';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import {waitsForAndRuns} from '../../utils';

describe('command collection executor', () => {

  it('should log error if no command collection exists', (done) => {
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(undefined);
    spyOn(CoreLog, 'logError').and.callThrough();

    executeCommandCollection();
    waitsForAndRuns(
      wasErrorLogged(),
      () => {
        expect(CoreLog.logError).toHaveBeenCalledWith('Unexpectedly no command collection found!');
        done();
      },
      2000);
  });

  it('should log error if command collection contains invalid command that is not a function', (done) => {
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(['thisIsNotAFunction']);
    spyOn(CoreLog, 'logError').and.callThrough();

    executeCommandCollection();
    waitsForAndRuns(
      wasErrorLogged(),
      () => {
        expect(CoreLog.logError).toHaveBeenCalledTimes(1);
        expect(CoreLog.logError.calls.argsFor(0)[0]).toContain("Invalid CMP command");
        done();
      },
      5000
    );
  });

  it('should log error if command collection contains invalid command that does not have callback and callId', (done) => {
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue([{
      command: () => {
      },
      parameter: "aParameter"
    }]);
    spyOn(CoreLog, 'logError').and.callThrough();

    executeCommandCollection();
    waitsForAndRuns(
      wasErrorLogged(),
      () => {
        expect(CoreLog.logError).toHaveBeenCalledTimes(1);
        expect(CoreLog.logError.calls.argsFor(0)[0]).toContain("Invalid command entry");
        done();
      },
      5000
    );
  });

  it('should process command with callback', (done) => {
    const commandParameter = 'aParameter';
    const commandResult = 'aResult';

    let commandToBeExecuted = givenCommand(commandParameter, commandResult);
    let callbackToBeInvoked = (result, success) => {
      expect(result).toEqual(commandResult);
      expect(success).toBeTruthy();
      done();
    };
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithCallback(commandToBeExecuted, commandParameter, callbackToBeInvoked));

    executeCommandCollection();
  });

  it('should process command with callback and return error status', (done) => {
    const commandParameter = 'aParameter';

    let commandToBeExecuted = givenCommand(commandParameter, undefined);
    let callbackToBeInvoked = (result, success) => {
      expect(result).toEqual(undefined);
      expect(success).toBeFalsy();
      done();
    };
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithCallback(commandToBeExecuted, commandParameter, callbackToBeInvoked));

    executeCommandCollection();
  });

  it('should process command from message event', (done) => {
    const commandParameter = 'aParameter';
    const commandResult = 'aResult';
    const commandCallId = 'aCallId';
    const commandEventOrigin = 'http://this.is.an.origin.de';

    let commandToBeExecuted = givenCommand(commandParameter, commandResult);
    let postMessageSpy = jasmine.createSpy('postMessage');
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithEvent(commandToBeExecuted, commandParameter, commandCallId, commandEventOrigin, postMessageSpy));

    executeCommandCollection();

    waitsForAndRuns(
      () => postMessageSpy.calls && postMessageSpy.calls.count() > 0,
      () => {
        expect(postMessageSpy).toHaveBeenCalledWith(givenExpectedResultMessage(commandResult, true, commandCallId), commandEventOrigin);
        done();
      },
      2000
    )
  });

  it('should process command from message event and send error status', (done) => {
    const commandParameter = 'aParameter';
    const commandCallId = 'aCallId';
    const commandEventOrigin = 'http://this.is.an.origin.de';

    let commandToBeExecuted = givenCommand(commandParameter, undefined);
    let postMessageSpy = jasmine.createSpy('postMessage');
    spyOn(CoreUtils, 'getCommandCollection').and.returnValue(givenCommandEntryWithEvent(commandToBeExecuted, commandParameter, commandCallId, commandEventOrigin, postMessageSpy));

    executeCommandCollection();

    waitsForAndRuns(
      () => postMessageSpy.calls && postMessageSpy.calls.count() > 0,
      () => {
        expect(postMessageSpy).toHaveBeenCalledWith(givenExpectedResultMessage(undefined, false, commandCallId), commandEventOrigin);
        done();
      },
      2000
    )
  });

  function givenCommand(commandParameter, commandResult) {
    let commandToBeExecuted = (parameter) => {
      expect(parameter).toEqual(commandParameter);
      return commandResult;
    };
    return commandToBeExecuted;
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

  function wasErrorLogged() {
    return () => CoreLog.logError.calls && CoreLog.logError.calls.count() > 0;
  }

});
