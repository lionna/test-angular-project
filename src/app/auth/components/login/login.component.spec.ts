import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { BrowserStorageService } from "../../services/storage.service";
import { UserAuthService } from "../../services/user.auth.service";
import { LoginComponent } from "./login.component";

jest.mock("../../services/user.auth.service");
jest.mock("@angular/router");

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userAuthService: jest.Mocked<UserAuthService>;
    let router: jest.Mocked<Router>;
    const testUserName = "test@test.test";
    const testPassword = "TestPassword123!";

    beforeEach(async () => {
        const mockStorageService = {
            get: jest.fn(),
            set: jest.fn(),
            delete: jest.fn(),
        } as unknown as BrowserStorageService;

        userAuthService = new UserAuthService(
            router,
            mockStorageService,
        ) as jest.Mocked<UserAuthService>;
        router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                LoginComponent,
                CustomButtonComponent,
            ],
            providers: [
                { provide: UserAuthService, useValue: userAuthService },
                { provide: Router, useValue: router },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should have invalid form when empty", () => {
        expect(component.loginForm.valid).toBeFalsy();
    });

    it("should display error messages when fields are invalid and touched", () => {
        const loginInput = component.loginForm.controls.login;
        const passwordInput = component.loginForm.controls.password;

        loginInput.markAsTouched();
        passwordInput.markAsTouched();
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector(".error")?.textContent).toContain(
            "Please enter a login email.",
        );
    });

    it("should call authenticateUser on valid form submission", () => {
        component.loginForm.controls.login.setValue(testUserName);
        component.loginForm.controls.password.setValue(testPassword);
        userAuthService.authenticateUser.mockReturnValue(true);
        component.onSubmit();
        expect(userAuthService.authenticateUser).toHaveBeenCalledWith(
            testUserName,
            testPassword,
        );
        expect(router.navigate).toHaveBeenCalledWith(["/search"]);
    });

    it("should alert when form is invalid on submission", () => {
        window.alert = jest.fn();
        component.onSubmit();
        expect(window.alert).toHaveBeenCalledWith("Invalid login or password.");
    });

    it("should alert when authentication fails", () => {
        component.loginForm.controls.login.setValue(testUserName);
        component.loginForm.controls.password.setValue(testPassword);
        userAuthService.authenticateUser.mockReturnValue(false);
        window.alert = jest.fn();
        component.onSubmit();
        expect(window.alert).toHaveBeenCalledWith(
            "Check input Value. Invalid login or password.",
        );
    });
});
