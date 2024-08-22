import {
    Directive, ElementRef, Input, OnChanges
} from "@angular/core";

import { BORDER_COLORS, DAYS_THRESHOLDS } from "../utils/constants";
import { getDateDifferenceInDays } from "../utils/date-utils";

@Directive({
    selector: "[appBorderItem]",
    standalone: true
})
export class BorderItemDirective implements OnChanges {
    @Input("appBorderItem") publicationDate!: string;

    constructor(private el: ElementRef) {
    }

    ngOnChanges(): void {
        this.setBorderColor();
    }

    private setBorderColor(): void {
        const diffDays = getDateDifferenceInDays(this.publicationDate);

        let borderColor = "";
        if (diffDays > DAYS_THRESHOLDS.OLD) {
            borderColor = BORDER_COLORS.BORDER_COLOR_OLD;
        } else if (diffDays > DAYS_THRESHOLDS.MIDDLE_AGED) {
            borderColor = BORDER_COLORS.BORDER_COLOR_MIDDLE_AGED;
        } else if (diffDays > DAYS_THRESHOLDS.RECENT) {
            borderColor = BORDER_COLORS.BORDER_COLOR_RECENT;
        } else {
            borderColor = BORDER_COLORS.BORDER_COLOR_NEW;
        }

        this.el.nativeElement.style.borderBottomColor = borderColor;
    }
}
