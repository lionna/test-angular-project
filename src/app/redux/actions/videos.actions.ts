import { createAction, props } from "@ngrx/store";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";

export const loadYouTubeVideos = createAction(
    "[Videos] Load YouTube Videos",
    props<{ query: string }>(),
);
export const startLoadingYouTubeVideos = createAction(
    "[Videos] Start loading YouTube Videos",
);

export const finishLoadingYouTubeVideos = createAction(
    "[Videos] Finish loading YouTube Videos",
    props<{ videos: VideoItem[] }>(),
);
