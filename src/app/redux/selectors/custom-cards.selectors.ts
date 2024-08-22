import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CustomCardsState } from "../reducers/custom-cards.reducer";

export const selectCustomCardState =
    createFeatureSelector<CustomCardsState>("customCards");

export const selectAllCustomCards = createSelector(
    selectCustomCardState,
    (state: CustomCardsState) => state.customCards,
);

export const selectIsCustom = (videoId: string) =>
    createSelector(selectCustomCardState, (state: CustomCardsState) =>
        state.customCards.some((video) => video.id === videoId),
    );

export const selectCustomCardById = (videoId: string) =>
    createSelector(selectCustomCardState, (state: CustomCardsState) =>
        state.customCards.find((video) => video.id === videoId),
    );

export const selectCustomCardCount = createSelector(
    selectCustomCardState,
    (state: CustomCardsState) => state.customCards.length,
);
