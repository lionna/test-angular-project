import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { BrowserStorageService } from "./storage.service";
import { UserAuthService } from "./user.auth.service";

describe("UserAuthService", () => {
    let service: UserAuthService;
    let mockRouter: Partial<Router>;
    let mockStorageService: Partial<BrowserStorageService>;

    const mockAuthTokenKey = "authToken";
    const mockUserKey = "userName";
    const mockAdminUserName = "admin@test.com";
    const testUserName = "test@test.com";
    const testAuthToken = "dummy-auth-token";
    const testPassword = "someTestPassword!123";
    let authState: boolean | false;
    let isAdminState: boolean | false;

    beforeEach(() => {
        mockRouter = {
            navigate: jest.fn(),
        };

        mockStorageService = {
            get: jest.fn(),
            set: jest.fn(),
            delete: jest.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                UserAuthService,
                { provide: Router, useValue: mockRouter },
                {
                    provide: BrowserStorageService,
                    useValue: mockStorageService,
                },
            ],
        });

        service = TestBed.inject(UserAuthService);
    });

    it("should be created successfully", () => {
        expect(service).toBeTruthy();
    });

    describe("isUserAuthenticated", () => {
        it("should return true if the auth token is present in storage", () => {
            (mockStorageService.get as jest.Mock).mockReturnValue(
                testAuthToken,
            );
            expect(service.isUserAuthenticated()).toBe(true);
        });

        it("should return false if the auth token is absent from storage", () => {
            (mockStorageService.get as jest.Mock).mockReturnValue(null);
            expect(service.isUserAuthenticated()).toBe(false);
        });
    });

    describe("getCurrentUser", () => {
        it("should return the current user's name from storage", () => {
            (mockStorageService.get as jest.Mock).mockReturnValue(testUserName);
            expect(service.getCurrentUser()).toBe(testUserName);
        });

        it("should return null if no user is found in storage", () => {
            (mockStorageService.get as jest.Mock).mockReturnValue(null);
            expect(service.getCurrentUser()).toBeNull();
        });
    });

    describe("authenticateUser", () => {
        it("should authenticate the user and store the auth token and username if valid credentials are provided", () => {
            const result = service.authenticateUser(testUserName, testPassword);

            expect(mockStorageService.set).toHaveBeenCalledWith(
                mockAuthTokenKey,
                testAuthToken,
            );
            expect(mockStorageService.set).toHaveBeenCalledWith(
                mockUserKey,
                testUserName,
            );
            expect(result).toBe(true);

            service.authState$.subscribe((state) => {
                authState = state;
            });

            expect(authState).toBe(true);
        });

        it("should not authenticate the user and not store any data if the username or password is empty", () => {
            const result1 = service.authenticateUser("", testPassword);
            const result2 = service.authenticateUser(testUserName, "");

            expect(result1).toBe(false);
            expect(result2).toBe(false);
            expect(mockStorageService.set).not.toHaveBeenCalled();

            service.authState$.subscribe((state) => {
                authState = state;
            });

            expect(authState).toBe(false);
        });
    });

    describe("signOut", () => {
        it("should clear the storage and redirect to the login page upon sign out", () => {
            service.signOut();

            expect(mockStorageService.delete).toHaveBeenCalledWith(
                mockAuthTokenKey,
            );
            expect(mockStorageService.delete).toHaveBeenCalledWith(mockUserKey);
            expect(mockRouter.navigate).toHaveBeenCalledWith(["/login"]);

            service.authState$.subscribe((state) => {
                authState = state;
            });

            service.isAdmin$.subscribe((state) => {
                isAdminState = state;
            });

            expect(authState).toBe(false);
            expect(isAdminState).toBe(false);
        });
    });

    describe("checkAdminStatus", () => {
        it("should return true if the current user is an admin", () => {
            (mockStorageService.get as jest.Mock).mockReturnValue(
                mockAdminUserName,
            );
            expect(service.checkAdminStatus()).toBe(true);
        });

        it("should return false if the current user is not an admin", () => {
            (mockStorageService.get as jest.Mock).mockReturnValue(testUserName);
            expect(service.checkAdminStatus()).toBe(false);
        });
    });
});
