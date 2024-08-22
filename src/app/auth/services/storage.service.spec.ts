import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { BrowserStorageService } from "./storage.service";

jest.mock("@angular/common", () => ({
    isPlatformBrowser: jest.fn(),
}));

describe("BrowserStorageService", () => {
    let service: BrowserStorageService;
    const PLATFORM_BROWSER = "browser";
    const TEST_KEY = "testKey";
    const TEST_VALUE = "testValue";

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BrowserStorageService,
                { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER },
            ],
        });
        service = TestBed.inject(BrowserStorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("get", () => {
        it("should return value from localStorage if platform is browser", () => {
            (isPlatformBrowser as jest.Mock).mockReturnValue(true);
            const spy = jest
                .spyOn(Storage.prototype, "getItem")
                .mockImplementation(() => TEST_VALUE);
            const result = service.get(TEST_KEY);
            expect(spy).toHaveBeenCalledWith(TEST_KEY);
            expect(result).toBe(TEST_VALUE);
        });

        it("should return null if platform is not browser", () => {
            (isPlatformBrowser as jest.Mock).mockReturnValue(false);
            const result = service.get(TEST_KEY);
            expect(result).toBeNull();
        });
    });

    describe("set", () => {
        it("should set value in localStorage if platform is browser", () => {
            (isPlatformBrowser as jest.Mock).mockReturnValue(true);
            const spy = jest
                .spyOn(Storage.prototype, "setItem")
                .mockImplementation(() => {});
            service.set(TEST_KEY, TEST_VALUE);
            expect(spy).toHaveBeenCalledWith(TEST_KEY, TEST_VALUE);
        });

        it("should not set value in localStorage if platform is not browser", () => {
            (isPlatformBrowser as jest.Mock).mockReturnValue(false);

            const spy = jest.spyOn(Storage.prototype, "setItem");

            service.set(TEST_KEY, TEST_VALUE);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("delete", () => {
        it("should remove value from localStorage if platform is browser", () => {
            (isPlatformBrowser as jest.Mock).mockReturnValue(true);
            const spy = jest
                .spyOn(Storage.prototype, "removeItem")
                .mockImplementation(() => {});
            service.delete(TEST_KEY);
            expect(spy).toHaveBeenCalledWith(TEST_KEY);
        });

        it("should not remove value from localStorage if platform is not browser", () => {
            (isPlatformBrowser as jest.Mock).mockReturnValue(false);
            const spy = jest.spyOn(Storage.prototype, "removeItem");
            service.delete(TEST_KEY);
            expect(spy).not.toHaveBeenCalled();
        });
    });
});
