import { AbstractControl } from "@angular/forms";

import { PasswordStrengthValidator } from "./password-strength.validator";

describe("PasswordStrengthValidator", () => {
    let control: AbstractControl;

    beforeEach(() => {
        control = {} as AbstractControl;
    });

    function setControlValue(value: string) {
        Object.defineProperty(control, "value", {
            value,
            writable: true,
        });
    }

    it("should return null for a valid password", () => {
        setControlValue("SomeValidPassword!123");
        const result = PasswordStrengthValidator.strong(control);
        expect(result).toBeNull();
    });

    describe.each([
        { value: "Pas!123" },
        { value: "somevalidpassword!123" }, // Missing uppercase letter
        { value: "SOMEVALIDPASSWORD!123" }, // Missing lowercase letter
        { value: "SomeValidPassword!" }, // Missing number
        { value: "SomeValidPassword123" }, // Missing special character
    ])("Password strength validation", ({ value }) => {
        it(`should return an error for password "${value}"`, () => {
            setControlValue(value);

            const result = PasswordStrengthValidator.strong(control);

            expect(result).toEqual({
                strong: "Your password isn't strong enough.It should be at least 8 characters long and include a mixture ofuppercase, lowercase, numbers, and special characters !@#?+_",
            });
        });
    });

    describe.each(["", "\t", "\n"])("Empty or whitespace password", (value) => {
        it(`should return null for empty or whitespace password "${value}"`, () => {
            setControlValue(value);

            const result = PasswordStrengthValidator.strong(control);

            expect(result).toEqual({
                strong: "Input value is empty",
            });
        });
    });
});
