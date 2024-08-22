import { VideoItemBuilder } from "../../shared/utils/videoItemBuilder";
import { addFavorite, removeFavorite } from "../actions/favorite.actions";
import {
    favoriteReducer,
    FavoriteState,
    initialState,
} from "./favorite.reducer";

describe("Favorite Reducer", () => {
    const video1 = new VideoItemBuilder()
        .withId("123")
        .withTitle("Test Video 1")
        .build();

    const video2 = new VideoItemBuilder()
        .withId("456")
        .withTitle("Test Video 2")
        .build();

    it("should initialize to the default state when no action is provided", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = favoriteReducer(undefined, action);
        expect(state).toEqual(initialState);
    });

    it("should correctly add a video to the favorites list when addFavorite action is dispatched", () => {
        const action = addFavorite({ video: video1 });

        const expectedState: FavoriteState = {
            ...initialState,
            favorites: [video1],
        };

        const state = favoriteReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    it("should correctly remove a video from the favorites list when removeFavorite action is dispatched", () => {
        const existingState: FavoriteState = {
            ...initialState,
            favorites: [video1, video2],
        };

        const action = removeFavorite({ videoId: "123" });

        const expectedState: FavoriteState = {
            ...initialState,
            favorites: [video2],
        };

        const state = favoriteReducer(existingState, action);
        expect(state).toEqual(expectedState);
    });

    it("should retain the current favorites list if the videoId does not match any existing favorite on removeFavorite action", () => {
        const existingState: FavoriteState = {
            ...initialState,
            favorites: [video1, video2],
        };

        const action = removeFavorite({ videoId: "789" });

        const state = favoriteReducer(existingState, action);
        expect(state).toEqual(existingState);
    });
});
