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
            expect(cookieData.expanded).toBe(true);
        });

        it('should reset to default cookie if cookie name is not set to oil', () => {
            Cookie.set('oil_data2', { optin: false, expanded: true }, { expires: 31 });
            validateOilCookie();
            let cookieData = getOilCookie();
            expect(cookieData).toBeDefined();
            expect(cookieData.optin).toBe(false);
            expect(cookieData.expanded).toBe(true);
        });

        it('should reset to default cookie if cookie keys are not matching', () => {
            Cookie.set('oil_data', { optin2: false, expanded2: true }, { expires: 31 });
            validateOilCookie();
            let cookieData = getOilCookie();
            expect(cookieData).toBeDefined();
            expect(cookieData.optin2).toBeUndefined();
            expect(cookieData.expanded2).toBeUndefined();
            expect(cookieData.optin).toBe(false);
            expect(cookieData.expanded).toBe(true);
        });
    });

    describe('oilOptIn', () => {
        it('should persist optin', (done) => {
            oilOptIn().then((cookieData) => {
                expect(cookieData).toBeDefined();
                expect(cookieData.optin).toBe(true);
                done();
            });
        });
    });

    describe('oilOptLater', () => {
        it('should persist optlater', (done) => {
            oilOptLater().then((cookieData) => {
                expect(cookieData).toBeDefined();
                expect(cookieData.expanded).toBe(false);
                done();
            });
        });
    });
});
