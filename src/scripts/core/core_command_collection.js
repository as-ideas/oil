import {logError, logInfo} from './core_log';
import {getCommandCollection} from './core_utils';

export function executeCommandCollection() {
  let commandCollection = getCommandCollection();

  if (commandCollection) {
    let commandCollectionLength = commandCollection.length;
    for (let i = 0; i < commandCollectionLength; i++) {
      let commandEntry = commandCollection[i];
      processCommand(commandEntry.command, commandEntry.parameter).then(
        (result) => {
          if (commandEntry.callback) {
            commandEntry.callback(result, (typeof result !== 'undefined'));
          } else if (commandEntry.callId) {
            let resultMessage = createResultMessage(result, commandEntry);
            commandEntry.event.source.postMessage(resultMessage, commandEntry.event.origin);
          } else {
            logError(`Invalid command entry '${JSON.stringify(commandEntry)}' found!`);
          }
        },
        (error) => logError(error));
    }
  } else {
    logError('Unexpectedly no command collection found!');
  }
}

function processCommand(command, parameter, callback) {
  return new Promise((resolve, reject) => {
    if (typeof command === 'function') {
      logInfo(`Processing command "${command}" with parameters "${parameter}"`);
      return resolve(command(parameter, callback));
    } else {
      return reject(`Invalid CMP command "${command}"`);
    }
  });
}

function createResultMessage(result, commandEntry) {
  return {
    __cmpReturn: {
      returnValue: result,
      success: typeof(result) !== 'undefined',
      callId: commandEntry.callId
    }
  };
}

function getVendorConsents(vendorIds) {
  // TODO implement vendor consents retrieval here
  return {};
}

function getConsentData(consentStringVersion, callback = () => {
}) {
  // TODO create vendor cookie value here
  return '';
}

function getPublisherConsents(purposeIds) {
  // This method is not implemented yet.
  return undefined;
}

function getVendorList(vendorListVersion) {
  // This method is not implemented yet.
  return undefined;
}
