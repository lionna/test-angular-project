import { createReducer, on } from "@ngrx/store";

import { CustomVideoItem } from "../../shared/interfaces/customVideoItem.interface";
import {
    addCustomCard,
    removeCustomCard,
} from "../actions/custom-cards.actions";

export interface CustomCardsState {
    customCards: CustomVideoItem[];
}

export const initialCustomCardsState: CustomCardsState = {
    customCards: [],
};

export const customCardsReducer = createReducer(
    initialCustomCardsState,
    on(
        addCustomCard,
        (state, { video }): CustomCardsState => ({
            ...state,
            customCards: [...state.customCards, video],
        }),
    ),
    on(
        removeCustomCard,
        (state, { videoId }): CustomCardsState => ({
            ...state,
            customCards: state.customCards.filter(
                (video) => video.id !== videoId,
            ),
        }),
    ),
);
