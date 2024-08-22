import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FavoriteState } from "../reducers/favorite.reducer";

export const selectFavoriteState =
    createFeatureSelector<FavoriteState>("favorites");

export const selectAllFavorites = createSelector(
    selectFavoriteState,
    (state: FavoriteState) => state.favorites,
);

export const selectIsFavorite = (videoId: string) =>
    createSelector(selectFavoriteState, (state: FavoriteState) =>
        state.favorites.some((video) => video.id === videoId),
    );

export const selectFavoriteCount = createSelector(
    selectFavoriteState,
    (state: FavoriteState) => state.favorites.length,
);
