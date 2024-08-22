import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    selector: "app-form-group",
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, CustomButtonComponent],
    templateUrl: "./form-group.component.html",
    styleUrls: ["./form-group.component.scss"],
})
export class FormGroupComponent {
    @Input() parentForm!: FormGroup;
    @Input() formArrayName!: string;
    @Input() labelValue!: string;
    @Input() messageValue!: string;

    @Output() addItem = new EventEmitter<void>();
    @Output() removeItem = new EventEmitter<number>();

    get formArray(): FormArray {
        return this.parentForm.get(this.formArrayName) as FormArray;
    }
}
