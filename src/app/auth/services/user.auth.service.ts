import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { BrowserStorageService } from "./storage.service";

@Injectable({
    providedIn: "root",
})
export class UserAuthService {
    private readonly authTokenKey = "authToken";
    private readonly userKey = "userName";

    private authStateSubject = new BehaviorSubject<boolean>(
        this.isUserAuthenticated(),
    );
    authState$: Observable<boolean> = this.authStateSubject.asObservable();

    private isAdminSubject = new BehaviorSubject<boolean>(
        this.checkAdminStatus(),
    );
    isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

    constructor(
        private router: Router,
        private storageService: BrowserStorageService,
    ) {}

    public isUserAuthenticated(): boolean {
        return !!this.storageService.get(this.authTokenKey);
    }

    getCurrentUser(): string | null {
        return this.storageService.get(this.userKey);
    }

    authenticateUser(inputLogin: string, inputPassword: string): boolean {
        if (inputLogin.trim() && inputPassword.trim()) {
            this.storageService.set(this.authTokenKey, "dummy-auth-token");
            this.storageService.set(this.userKey, inputLogin);
            this.authStateSubject.next(true);
            this.isAdminSubject.next(this.checkAdminStatus());
            return true;
        }
        return false;
    }

    signOut(): void {
        this.storageService.delete(this.authTokenKey);
        this.storageService.delete(this.userKey);
        this.authStateSubject.next(false);
        this.isAdminSubject.next(false);
        this.router.navigate(["/login"]);
    }

    checkAdminStatus(): boolean {
        const currentUser = this.getCurrentUser();
        return currentUser === "admin@test.com";
    }
}
