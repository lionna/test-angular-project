import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";

import { UserAuthService } from "../../../../auth/services/user.auth.service";
import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";

@Component({
    selector: "app-login-info",
    standalone: true,
    imports: [RouterLink, CommonModule, CustomButtonComponent],
    templateUrl: "./login-info.component.html",
    styleUrl: "./login-info.component.scss"
})

export class LoginInfoComponent implements OnInit, OnDestroy {
    isUserAuthenticated = false;
    login: string | null = null;
    private authSubscription: Subscription | null = null;

    constructor(
        private authService: UserAuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.updateAuthStatus();
        this.authSubscription = this.authService.authState$.subscribe(
            (status) => {
                this.isUserAuthenticated = status;
                if (status) {
                    this.login = this.authService.getCurrentUser();
                } else {
                    this.login = null;
                }
            }
        );
    }

    ngOnDestroy() {
        this.authSubscription?.unsubscribe();
    }

    updateAuthStatus() {
        this.isUserAuthenticated = this.authService.isUserAuthenticated();
        this.login = this.authService.getCurrentUser();
    }

    navigateToLogin() {
        this.router.navigate(["/login"]);
    }

    logout() {
        this.authService.signOut();
        this.router.navigate(["/login"]);
    }
}
