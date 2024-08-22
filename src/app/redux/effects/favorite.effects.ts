import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

import { addFavorite, removeFavorite } from "../actions/favorite.actions";

@Injectable()
export class FavoriteEffects {
    constructor(private actions$: Actions) {}

    addFavorite$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(addFavorite),
                tap((action) => {
                    console.log("Added to favorites:", action.video);
                }),
            );
        },
        { dispatch: false },
    );

    removeFavorite$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(removeFavorite),
                tap((action) => {
                    console.log("Removed from favorites:", action.videoId);
                }),
            );
        },
        { dispatch: false },
    );
}
