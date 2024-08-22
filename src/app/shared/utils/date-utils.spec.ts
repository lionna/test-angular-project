import { calculateDateDifferenceInDays } from "./date-utils";

describe("calculateDateDifferenceInDays", () => {
    const BASE_DATE = new Date("2024-08-01");
    const ONE_DAY = 1;
    const TWO_DAYS = 2;
    const NEGATIVE_FOUR_DAYS = -4;
    const PREVIOUS_MONTH = new Date("2024-07-31");

    test("should return 0 when both dates are the same", () => {
        const date1 = BASE_DATE;
        const date2 = BASE_DATE;
        const result = calculateDateDifferenceInDays(date1, date2);
        expect(result).toBe(0);
    });

    test("should return 1 when there is a 1-day difference", () => {
        const date1 = BASE_DATE;
        const date2 = new Date(BASE_DATE);
        date2.setDate(BASE_DATE.getDate() + ONE_DAY);
        const result = calculateDateDifferenceInDays(date1, date2);
        expect(result).toBe(ONE_DAY);
    });

    test("should return 2 when dates are 2 days apart, including month boundaries", () => {
        const date1 = new Date(BASE_DATE);
        date1.setDate(BASE_DATE.getDate() - ONE_DAY);
        const date2 = new Date(BASE_DATE);
        date2.setDate(BASE_DATE.getDate() + ONE_DAY);
        const result = calculateDateDifferenceInDays(date1, date2);
        expect(result).toBe(TWO_DAYS);
    });

    test("should return 2 when dates are 2 days apart", () => {
        const date1 = PREVIOUS_MONTH;
        const date2 = new Date(BASE_DATE);
        date2.setDate(BASE_DATE.getDate() + ONE_DAY);
        const result = calculateDateDifferenceInDays(date1, date2);
        expect(result).toBe(TWO_DAYS);
    });

    test("should return the absolute value of negative difference", () => {
        const date1 = BASE_DATE;
        const date2 = new Date(BASE_DATE);
        date2.setDate(BASE_DATE.getDate() + NEGATIVE_FOUR_DAYS);
        const result = calculateDateDifferenceInDays(date1, date2);
        expect(result).toBe(Math.abs(NEGATIVE_FOUR_DAYS));
    });
});
