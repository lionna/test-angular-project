import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { UserAuthService } from "../../../../auth/services/user.auth.service";
import { selectFavoriteCount } from "../../../../redux/selectors/favorite.selectors";
import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";
import { AddItemButtonComponent } from "../add-item-button/add-item-button.component";
import { FavoriteButtonComponent } from "../favorite-button/favorite-button.component";

@Component({
    selector: "app-login-info",
    standalone: true,
    imports: [
        RouterLink,
        CommonModule,
        CustomButtonComponent,
        FavoriteButtonComponent,
        AddItemButtonComponent,
    ],
    templateUrl: "./login-info.component.html",
    styleUrls: ["./login-info.component.scss"],
})
export class LoginInfoComponent implements OnInit, OnDestroy {
    isAdmin = false;
    isUserAuthenticated = false;
    login: string | null = null;
    favoriteCount = toSignal(this.store.select(selectFavoriteCount), {
        initialValue: 0,
    });
    private authSubscription: Subscription | null = null;
    private adminSubscription: Subscription | null = null;

    constructor(
        private authService: UserAuthService,
        private router: Router,
        private store: Store,
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
            },
        );

        this.adminSubscription = this.authService.isAdmin$.subscribe(
            (isAdmin) => {
                this.isAdmin = isAdmin;
            },
        );
    }

    ngOnDestroy() {
        this.authSubscription?.unsubscribe();
        this.adminSubscription?.unsubscribe();
    }

    updateAuthStatus() {
        this.isUserAuthenticated = this.authService.isUserAuthenticated();
        this.login = this.authService.getCurrentUser();
        this.isAdmin = this.authService.checkAdminStatus();
    }

    navigateToLogin() {
        this.router.navigate(["/login"]);
    }

    logout() {
        this.authService.signOut();
        this.router.navigate(["/login"]);
    }

    onCreatePage() {
        this.router.navigate(["/create"]);
    }

    onFavoritePage() {
        this.router.navigate(["/favorites"]);
    }
}
