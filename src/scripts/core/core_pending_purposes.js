import { logInfo } from './core_log';

/**
 * Pending purposes is a mutable array of purposes, which is used to
 * preserve purpose settings while a consent is pending.
 */
export let pendingPurposes = false;

export function getPendingPurposes() {
  return pendingPurposes;
}

export function setPendingPurposes(purposes) {
  pendingPurposes = purposes;
  logInfo('Set pending purposes', pendingPurposes)
}

export function addPendingPurpose(str) {
  const id = parseInt(str, 10);
  if (pendingPurposes.indexOf(id) === -1) {
    pendingPurposes.push(id);
    logInfo('Add pending purpose', id)
  }
}

export function removePendingPurpose(str) {
  const id = parseInt(str, 10);
  if (pendingPurposes.indexOf(id) !== -1) {
    pendingPurposes = pendingPurposes.filter(i => i !== id);
    logInfo('Remove pending purpose', id)
  }
}

export function setPendingPurpose(Id, value) {
  if(value) {
    addPendingPurpose(Id);
  } else {
    removePendingPurpose(Id);
  }
}

export function resetPendingPurposes() {
  pendingPurposes = false;
}
