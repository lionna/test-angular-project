import { createAction, props } from "@ngrx/store";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";

export const addFavorite = createAction(
    "[Favorite] Add Favorite",
    props<{ video: VideoItem }>(),
);

export const removeFavorite = createAction(
    "[Favorite] Remove Favorite",
    props<{ videoId: string }>(),
);
