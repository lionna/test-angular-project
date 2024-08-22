import { createReducer, on } from "@ngrx/store";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";
import {
    finishLoadingYouTubeVideos,
    startLoadingYouTubeVideos,
} from "../actions/videos.actions";

export interface VideosState {
    loading: boolean;
    videos: VideoItem[];
    query: string;
}

export const initialState: VideosState = {
    loading: false,
    videos: [],
    query: "",
};

export const videosReducer = createReducer(
    initialState,

    on(
        startLoadingYouTubeVideos,
        (state): VideosState => ({
            ...state,
            loading: true,
        }),
    ),

    on(
        finishLoadingYouTubeVideos,
        (state, { videos }): VideosState => ({
            ...state,
            loading: false,
            videos,
        }),
    ),
);
