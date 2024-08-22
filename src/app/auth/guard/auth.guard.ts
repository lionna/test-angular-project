import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { UserAuthService } from "../services/user.auth.service";

export const authGuardFn: CanActivateFn = () => {
    const authService = inject(UserAuthService);
    const router = inject(Router);

    if (authService.isUserAuthenticated()) {
        return true;
    }
    router.navigate(["/login"]);
    return false;
};
