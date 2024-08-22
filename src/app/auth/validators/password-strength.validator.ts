import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordStrengthValidator {
    static strong(control: AbstractControl): ValidationErrors | null {
        const value = control.value || "";

        if (!value) {
            return null;
        }

        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const hasSpecial = /[!@#?+_]+/.test(value);

        const isValid =
            hasMinLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumeric &&
            hasSpecial;

        if (!isValid) {
            return {
                strong:
                    "Your password isn't strong enough." +
                    "It should be at least 8 characters long and include a mixture of" +
                    "uppercase, lowercase, numbers, and special characters !@#?+_",
            };
        }

        return null;
    }
}
