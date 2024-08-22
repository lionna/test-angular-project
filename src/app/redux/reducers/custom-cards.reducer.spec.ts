import { CustomVideoItemBuilder } from "../../shared/utils/videoItemBuilder";
import {
    addCustomCard,
    removeCustomCard,
} from "../actions/custom-cards.actions";
import {
    customCardsReducer,
    CustomCardsState,
    initialCustomCardsState,
} from "./custom-cards.reducer";

describe("Custom Cards Reducer", () => {
    const video1 = new CustomVideoItemBuilder()
        .withId("123")
        .withTitle("Test Custom Card")
        .build();

    const video2 = new CustomVideoItemBuilder()
        .withId("456")
        .withTitle("Custom Card 2")
        .build();

    it("should return the initial state when an unknown action type is provided", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = customCardsReducer(undefined, action);
        expect(state).toEqual(initialCustomCardsState);
    });

    it("should add a new custom card when the addCustomCard action is dispatched", () => {
        const action = addCustomCard({ video: video1 });
        const expectedState: CustomCardsState = {
            ...initialCustomCardsState,
            customCards: [video1],
        };

        const state = customCardsReducer(initialCustomCardsState, action);
        expect(state).toEqual(expectedState);
    });

    it("should remove a custom card by its ID when the removeCustomCard action is dispatched", () => {
        const existingState: CustomCardsState = {
            ...initialCustomCardsState,
            customCards: [video1, video2],
        };

        const action = removeCustomCard({ videoId: "123" });
        const expectedState: CustomCardsState = {
            ...initialCustomCardsState,
            customCards: [video2],
        };

        const state = customCardsReducer(existingState, action);
        expect(state).toEqual(expectedState);
    });

    it("should not alter the custom cards list if the videoId does not match any existing card in the removeCustomCard action", () => {
        const existingState: CustomCardsState = {
            ...initialCustomCardsState,
            customCards: [video1, video2],
        };

        const action = removeCustomCard({ videoId: "789" });
        const state = customCardsReducer(existingState, action);
        expect(state).toEqual(existingState);
    });
});
