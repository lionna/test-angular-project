import { TestBed } from "@angular/core/testing";
import { addDays, format } from "date-fns";

import {
    DAYS_THRESHOLDS,
    ITEM_COLOR_CLASSES,
    ITEM_COLORS,
} from "../../shared/utils/constants";
import { getDateDifferenceInDays } from "../../shared/utils/date-utils";
import { ColorService } from "./color.service";

jest.mock("../../shared/utils/date-utils");

describe("ColorService", () => {
    let service: ColorService;
    const today = new Date();
    const dateFormat = "yyyy-MM-dd";

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ColorService],
        });
        service = TestBed.inject(ColorService);
    });

    const testCases = [
        {
            description: "for items considered old",
            dateOffset: -(DAYS_THRESHOLDS.OLD + 1),
            expectedColor: ITEM_COLORS.ITEM_COLOR_OLD,
            expectedColorClass: ITEM_COLOR_CLASSES.ITEM_COLOR_OLD,
        },
        {
            description: "for middle-aged items",
            dateOffset: -(DAYS_THRESHOLDS.MIDDLE_AGED + 1),
            expectedColor: ITEM_COLORS.ITEM_COLOR_MIDDLE_AGED,
            expectedColorClass: ITEM_COLOR_CLASSES.ITEM_COLOR_MIDDLE_AGED,
        },
        {
            description: "for recent items",
            dateOffset: -(DAYS_THRESHOLDS.RECENT + 1),
            expectedColor: ITEM_COLORS.ITEM_COLOR_RECENT,
            expectedColorClass: ITEM_COLOR_CLASSES.ITEM_COLOR_RECENT,
        },
        {
            description: "for new items",
            dateOffset: -(DAYS_THRESHOLDS.RECENT - 1),
            expectedColor: ITEM_COLORS.ITEM_COLOR_NEW,
            expectedColorClass: ITEM_COLOR_CLASSES.ITEM_COLOR_NEW,
        },
        {
            description: "for items with a null date",
            dateOffset: null,
            expectedColor: ITEM_COLORS.ITEM_COLOR_NEW,
            expectedColorClass: ITEM_COLOR_CLASSES.ITEM_COLOR_NEW,
        },
    ];

    describe("getColor", () => {
        test.each(testCases)(
            "should return $expectedColor $description",
            ({ dateOffset, expectedColor }) => {
                const date =
                    dateOffset !== null
                        ? format(addDays(today, dateOffset), dateFormat)
                        : null;
                (getDateDifferenceInDays as jest.Mock).mockReturnValue(
                    dateOffset !== null ? Math.abs(dateOffset) : null,
                );
                expect(service.getColor(date ?? "")).toBe(expectedColor);
            },
        );
    });

    describe("getColorClass", () => {
        test.each(testCases)(
            "should return $expectedColor $description",
            ({ dateOffset, expectedColorClass }) => {
                const date =
                    dateOffset !== null
                        ? format(addDays(today, dateOffset), dateFormat)
                        : null;
                (getDateDifferenceInDays as jest.Mock).mockReturnValue(
                    dateOffset !== null ? Math.abs(dateOffset) : null,
                );
                expect(service.getColorClass(date ?? "")).toBe(
                    expectedColorClass,
                );
            },
        );
    });
});
