import { createFeatureSelector, createSelector } from "@ngrx/store";

import { VideosState } from "../reducers/videos.reducer";

export const selectVideosState = createFeatureSelector<VideosState>("videos");

export const selectLoading = createSelector(
    selectVideosState,
    (state: VideosState) => state.loading,
);
export const selectAllVideos = createSelector(
    selectVideosState,
    (state) => state.videos,
);

export const selectCurrentQuery = createSelector(
    selectVideosState,
    (state: VideosState) => state.query,
);
