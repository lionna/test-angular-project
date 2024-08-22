import { createReducer, on } from "@ngrx/store";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";
import { addFavorite, removeFavorite } from "../actions/favorite.actions";

export interface FavoriteState {
    favorites: VideoItem[];
}

export const initialState: FavoriteState = {
    favorites: [],
};

export const favoriteReducer = createReducer(
    initialState,
    on(
        addFavorite,
        (state, { video }): FavoriteState => ({
            ...state,
            favorites: [...state.favorites, video],
        }),
    ),
    on(
        removeFavorite,
        (state, { videoId }): FavoriteState => ({
            ...state,
            favorites: state.favorites.filter((video) => video.id !== videoId),
        }),
    ),
);
