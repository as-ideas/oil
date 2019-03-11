import { logError, logInfo } from './core_log';
import { getCommandCollection } from './core_utils';
import { getConsentDataString, getVendorConsentData, getPublisherConsentData } from './core_consents';
import { getVendorList, loadVendorListAndCustomVendorList } from './core_vendor_information';

const commands = {
  getVendorConsents: (vendorIds) => {
    return getVendorConsentData(vendorIds);
  },

  getConsentData: (consentStringVersion) => {
    return getConsentDataString(consentStringVersion);
  },

  getPublisherConsents: (purposeIds) => {
    return getPublisherConsentData(purposeIds);
  },

  // FIXME needs support for vendorListVersion
  getVendorList: () => {
    return getVendorList();
  }

};


export function executeCommandCollection(commandEntry) {
  if (typeof commandEntry !== 'undefined') {
    processCommandEntry(commandEntry);
  } else {
    let commandCollection = getCommandCollection();

    if (commandCollection) {
      let commandCollectionLength = commandCollection.length;
      for (let i = 0; i < commandCollectionLength; i++) {
        let commandEntry = commandCollection[i];
        processCommandEntry(commandEntry);
      }
    }
  }
}

function processCommandEntry(commandEntry) {
  loadVendorListAndCustomVendorList()
    .then(() => {
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
    })
    .catch((error) => logError(error));
}

function processCommand(command, parameter) {
  return new Promise((resolve, reject) => {
    if (typeof(commands[command]) === 'function') {
      logInfo(`Processing command "${command}" with parameters "${parameter}"`);
      return resolve(commands[command](parameter));
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
