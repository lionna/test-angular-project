import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import { Router } from "@angular/router";

import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { FormGroupComponent } from "../../../shared/components/form-group/form-group.component";

@Component({
    selector: "app-create",
    standalone: true,
    imports: [
        CustomButtonComponent,
        ReactiveFormsModule,
        CommonModule,
        FormGroupComponent
    ],
    templateUrl: "./create.component.html",
    styleUrls: ["./create.component.scss"]
})
export class CreateComponent {
    constructor(
        private router: Router
    ) {}

    public createForm = new FormGroup({
        title: new FormControl(
            "",
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20)
            ]
        ),
        description: new FormControl(
            "",
            [
                Validators.maxLength(255)
            ]
        ),
        img: new FormControl(
            "",
            [
                Validators.required
            ]
        ),
        link: new FormControl(
            "",
            [
                Validators.required
            ]
        ),
        creationDate: new FormControl(
            "",
            [
                Validators.required,
                this.dateInFutureValidator
            ]
        ),
        tags: new FormArray([this.createTagControl()])
    });

    createTagControl(): FormControl {
        return new FormControl("", Validators.required);
    }

    get tags(): FormArray {
        return this.createForm.get("tags") as FormArray;
    }

    addItem(): void {
        if (this.tags.length < 5) {
            this.tags.push(this.createTagControl());
        }
    }

    removeItem(index: number): void {
        if (this.tags.length > 1) {
            this.tags.removeAt(index);
        }
    }

    onSubmit() {
        if (this.createForm.valid) {
            alert("Created.");
        } else {
            alert("Invalid input in card creation form.");
        }
    }

    clearForm() {
        this.createForm.reset();
        while (this.tags.length > 1) {
            this.tags.removeAt(0);
        }
        this.tags.reset();
    }

    dateInFutureValidator(control: AbstractControl): ValidationErrors | null {
        const enteredDate = new Date(control.value);
        const today = new Date();
        if (enteredDate > today) {
            return { dateInFuture: true };
        }
        return null;
    }
}
