import { VideoItemBuilder } from "../../shared/utils/videoItemBuilder";
import {
    finishLoadingYouTubeVideos,
    startLoadingYouTubeVideos,
} from "../actions/videos.actions";
import { initialState, videosReducer, VideosState } from "./videos.reducer";

describe("Videos Reducer", () => {
    const video1 = new VideoItemBuilder()
        .withTitle("Test Video 1")
        .withDescription("Description 1")
        .build();

    const video2 = new VideoItemBuilder()
        .withTitle("Test Video 2")
        .withDescription("Description 2")
        .build();

    const mockVideos = [video1, video2];

    it("should return the initial state by default", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = videosReducer(undefined, action);
        expect(state).toEqual(initialState);
    });

    it("should set loading to true on startLoadingYouTubeVideos action", () => {
        const action = startLoadingYouTubeVideos();
        const expectedState: VideosState = {
            ...initialState,
            loading: true,
        };

        const state = videosReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    it("should set loading to false and update videos on finishLoadingYouTubeVideos action with videos", () => {
        const action = finishLoadingYouTubeVideos({ videos: mockVideos });

        const expectedState: VideosState = {
            ...initialState,
            loading: false,
            videos: mockVideos,
        };

        const state = videosReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    it("should handle finishLoadingYouTubeVideos action with no videos provided", () => {
        const existingState: VideosState = {
            ...initialState,
            loading: true,
            videos: mockVideos,
        };

        const action = finishLoadingYouTubeVideos({ videos: [] });

        const expectedState: VideosState = {
            ...existingState,
            loading: false,
            videos: [],
        };

        const state = videosReducer(existingState, action);
        expect(state).toEqual(expectedState);
    });
});
