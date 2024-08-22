import { Routes } from "@angular/router";

import { LoginComponent } from "./auth/components/login/login.component";
import { authGuardFn } from "./auth/guard/auth.guard";
import { FavoriteListComponent } from "./favorite/components/favorite-list/favorite-list.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { CreateComponent } from "./youtube/components/create/create.component";
import { DetailComponent } from "./youtube/components/detail/detail.component";
import { SearchComponent } from "./youtube/components/search/search.component";

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        pathMatch: "full",
    },
    {
        path: "search",
        component: SearchComponent,
        canActivate: [authGuardFn],
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "detail/:id",
        component: DetailComponent,
        canActivate: [authGuardFn],
    },
    {
        path: "create",
        component: CreateComponent,
        canActivate: [authGuardFn],
    },
    {
        path: "favorites",
        component: FavoriteListComponent,
        canActivate: [authGuardFn],
    },
    {
        path: "404",
        component: NotFoundComponent,
    },
    {
        path: "**",
        redirectTo: "/404",
    },
];
