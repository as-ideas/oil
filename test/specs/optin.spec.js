import Cookie from 'js-cookie';
import { oilOptIn, oilOptLater } from "../../src/scripts/optin";
import { deleteAllCookies } from "../utils";
import { getSoiOptIn, getOptLater } from '../../src/scripts/cookies.js';

describe('optin', () => {

    beforeEach(() => {
        deleteAllCookies();
    });

    describe('without changes', () => {
        it('it should define default cookie', () => {
            expect(getSoiOptIn()).toBe(false);
            expect(getOptLater()).toBe(false);
        });

        it('should reset to default cookie if cookie name is not set to oil', () => {
            Cookie.set('oil_data2', { optin: false, optLater: false }, { expires: 31 });
            expect(getSoiOptIn()).toBe(false);
            expect(getOptLater()).toBe(false);
        });

        it('should reset to default cookie if cookie keys are not matching', () => {
            Cookie.set('oil_data', { optin2: false, optLater2: false }, { expires: 31 });
            expect(getSoiOptIn()).toBe(false);
            expect(getOptLater()).toBe(false);
        });
    });

    describe('oilOptIn', () => {
        it('should persist optin', (done) => {
            oilOptIn().then((optin) => {
                expect(optin).toBe(true);
                expect(getSoiOptIn()).toBe(true);
                expect(getOptLater()).toBe(false);
                done();
            });
        });
    });

    describe('oilOptLater', () => {
        it('should persist optlater', (done) => {
            oilOptLater().then((optlater) => {
              expect(optlater).toBe(true);
              expect(getSoiOptIn()).toBe(false);
              expect(getOptLater()).toBe(true);
                done();
            });
        });
    });
});
