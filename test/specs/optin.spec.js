import { getOilCookie, validateOilCookie, oilOptIn, oilOptLater } from "../../src/scripts/optin";
import Cookie from 'js-cookie';
import { deleteAllCookies } from "../utils";

describe('optin', () => {

    beforeEach(() => {
        deleteAllCookies();
    });

    describe('validateOilCookie', () => {
        it('should define default cookie', () => {
            validateOilCookie();
            let cookieData = getOilCookie();
            expect(cookieData).toBeDefined();
            expect(cookieData.optin).toBe(false);
            expect(cookieData.optLater).toBe(false);
        });

        it('should reset to default cookie if cookie name is not set to oil', () => {
            Cookie.set('oil_data2', { optin: false, optLater: false }, { expires: 31 });
            validateOilCookie();
            let cookieData = getOilCookie();
            expect(cookieData).toBeDefined();
            expect(cookieData.optin).toBe(false);
            expect(cookieData.optLater).toBe(false);
        });

        it('should reset to default cookie if cookie keys are not matching', () => {
            Cookie.set('oil_data', { optin2: false, optLater2: false }, { expires: 31 });
            validateOilCookie();
            let cookieData = getOilCookie();
            expect(cookieData).toBeDefined();
            expect(cookieData.optin2).toBeUndefined();
            expect(cookieData.optLater2).toBeUndefined();
            expect(cookieData.optin).toBe(false);
            expect(cookieData.optLater).toBe(false);
        });
    });

    describe('oilOptIn', () => {
        it('should persist optin', (done) => {
            oilOptIn().then((cookieData) => {
                expect(cookieData).toBeDefined();
                expect(cookieData.optin).toBe(true);
                expect(cookieData.optLater).toBeDefined();
                done();
            });
        });
    });

    describe('oilOptLater', () => {
        it('should persist optlater', (done) => {
            oilOptLater().then((cookieData) => {
                expect(cookieData).toBeDefined();
                expect(cookieData.optLater).toBe(true);
                expect(cookieData.optin).toBeDefined();
                done();
            });
        });
    });
});
