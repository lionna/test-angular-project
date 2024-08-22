import { Injectable } from "@angular/core";

import { DAYS_THRESHOLDS, ITEM_COLOR_CLASSES, ITEM_COLORS } from "../../shared/utils/constants";
import { getDateDifferenceInDays } from "../../shared/utils/date-utils";

@Injectable({
    providedIn: "root"
})
export class ColorService {
    getColor(publicationDate: string): string {
        const diffDays = getDateDifferenceInDays(publicationDate);

        let selectedColor = "";
        if (diffDays > DAYS_THRESHOLDS.OLD) {
            selectedColor = ITEM_COLORS.ITEM_COLOR_OLD;
        } else if (diffDays > DAYS_THRESHOLDS.MIDDLE_AGED) {
            selectedColor = ITEM_COLORS.ITEM_COLOR_MIDDLE_AGED;
        } else if (diffDays > DAYS_THRESHOLDS.RECENT) {
            selectedColor = ITEM_COLORS.ITEM_COLOR_RECENT;
        } else {
            selectedColor = ITEM_COLORS.ITEM_COLOR_NEW;
        }

        return selectedColor;
    }

    getColorClass(publicationDate: string): string {
        const diffDays = getDateDifferenceInDays(publicationDate);

        let selectedColorClass = "";
        if (diffDays > DAYS_THRESHOLDS.OLD) {
            selectedColorClass = ITEM_COLOR_CLASSES.ITEM_COLOR_OLD;
        } else if (diffDays > DAYS_THRESHOLDS.MIDDLE_AGED) {
            selectedColorClass = ITEM_COLOR_CLASSES.ITEM_COLOR_MIDDLE_AGED;
        } else if (diffDays > DAYS_THRESHOLDS.RECENT) {
            selectedColorClass = ITEM_COLOR_CLASSES.ITEM_COLOR_RECENT;
        } else {
            selectedColorClass = ITEM_COLOR_CLASSES.ITEM_COLOR_NEW;
        }

        return selectedColorClass;
    }
}
