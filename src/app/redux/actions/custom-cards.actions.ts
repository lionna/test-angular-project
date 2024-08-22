import { createAction, props } from "@ngrx/store";

import { CustomVideoItem } from "../../shared/interfaces/customVideoItem.interface";

export const addCustomCard = createAction(
    "[Custom Card] Add Custom Card",
    props<{ video: CustomVideoItem }>(),
);

export const removeCustomCard = createAction(
    "[Custom Card] Remove Custom Card",
    props<{ videoId: string }>(),
);
