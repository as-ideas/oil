import {
  getPendingPurposes,
  setPendingPurposes,
  addPendingPurpose,
  removePendingPurpose,
  setPendingPurpose
} from '../../../src/scripts/core/core_pending_purposes';
import { resetOil } from '../../test-utils/utils_reset';

describe('Pending purposes utils', () => {
  beforeEach(() => resetOil());

  describe('getPendingPurposes', () => {
    it('should return false initially', () => {
      expect(getPendingPurposes()).toEqual(false);
    });
  });

  describe('setPendingPurposes', () => {
    it('should setup pending purposes', () => {
      setPendingPurposes([]);
      expect(getPendingPurposes()).toEqual([]);
    });
  });

  describe('addPendingPurpose', () => {
    it('should add a pending purposes', () => {
      setPendingPurposes([]);
      addPendingPurpose(1);
      expect(getPendingPurposes()).toEqual([1]);
    });
  });

  describe('removePendingPurpose', () => {
    it('should remove a pending purposes', () => {
      setPendingPurposes([]);
      addPendingPurpose(1);
      removePendingPurpose(1);
      expect(getPendingPurposes()).toEqual([]);
    });
  });

  describe('removePendingPurpose', () => {
    it('should set a pending purposes', () => {
      setPendingPurposes([]);
      addPendingPurpose(1);
      setPendingPurpose(1, false);
      expect(getPendingPurposes()).toEqual([]);
    });
  });
});
