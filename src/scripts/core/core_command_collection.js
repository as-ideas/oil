import { logError, logInfo } from './core_log';
import { getCommandCollection } from './core_utils';
import { getConsentDataString, getVendorConsentData } from './core_consents';
import { getVendorList, loadVendorList } from './core_vendor_information';

const commands = {
  getVendorConsents: (vendorIds) => {
    return getVendorConsentData(vendorIds);
  },

  getConsentData: (consentStringVersion) => {
    return getConsentDataString(consentStringVersion);
  },

  // TODO OIL-91 T&CF: Optionale Call getPublisherConsents
  getPublisherConsents: (purposeIds) => {
    // This method is not implemented yet.
    return undefined;
  },

  getVendorList: (vendorListVersion) => {
    // This method is not implemented yet.
    return getVendorList();
  }

};


export function executeCommandCollection() {
  let commandCollection = getCommandCollection();

  if (commandCollection) {
    let commandCollectionLength = commandCollection.length;
    for (let i = 0; i < commandCollectionLength; i++) {
      let commandEntry = commandCollection[i];
      loadVendorList()
        .then(() => {
          processCommandEntry(commandEntry);
        })
        .catch((error) => logError(error));
    }
  }
}

function processCommandEntry(commandEntry) {
  processCommand(commandEntry.command, commandEntry.parameter)
    .then((result) => {
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

function processCommand(command, parameter, callback) {
  return new Promise((resolve, reject) => {
    if (typeof(commands[command]) === 'function') {
      logInfo(`Processing command "${command}" with parameters "${parameter}"`);
      return resolve(commands[command](parameter, callback));
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
