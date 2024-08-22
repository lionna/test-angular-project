import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { UserAuthService } from "../../services/user.auth.service";
import { PasswordStrengthValidator } from "../../validators/password-strength.validator";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CustomButtonComponent, ReactiveFormsModule, CommonModule],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    constructor(
        private userAuthService: UserAuthService,
        private router: Router,
    ) {}

    public loginForm = new FormGroup({
        login: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
            Validators.required,
            PasswordStrengthValidator.strong,
        ]),
    });

    onSubmit() {
        if (this.loginForm.valid) {
            const inputLogin = this.loginForm.controls.login.value ?? "";
            const inputPassword = this.loginForm.controls.password.value ?? "";

            if (
                this.userAuthService.authenticateUser(inputLogin, inputPassword)
            ) {
                this.router.navigate(["/search"]);
            } else {
                alert("Check input Value. Invalid login or password.");
            }
        } else {
            alert("Invalid login or password.");
        }
    }
}
