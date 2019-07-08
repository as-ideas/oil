import { logInfo } from './core_log';

export let pendingPurposes = false;

export function getPendingPurposes() {
  return pendingPurposes;
}

export function setPendingPurposes(purposes) {
  pendingPurposes = purposes;
  logInfo('set pending purposes', pendingPurposes)
}

export function addPendingPurpose(Id) {
  const id = parseInt(Id, 10);
  if (pendingPurposes.indexOf(id) === -1) {
    pendingPurposes.push(id);
    logInfo('add pending purpose', id)
  }
}

export function removePendingPurpose(Id) {
  const id = parseInt(Id, 10);
  if (pendingPurposes.indexOf(id) !== -1) {
    pendingPurposes = pendingPurposes.filter(i => i !== id);
    logInfo('remove pending purpose', id)
  }
}

export function setPendingPurpose(Id, value) {
  if(value) {
    addPendingPurpose(Id);
  } else {
    removePendingPurpose(Id);
  }
}
