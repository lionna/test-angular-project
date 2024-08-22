import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import * as CustomCardActions from "../../../redux/actions/custom-cards.actions";
import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { FormGroupComponent } from "../../../shared/components/form-group/form-group.component";
import { VALIDATION_FORM } from "../../../shared/utils/constants";
import { VideoService } from "../../services/video.service";

@Component({
    selector: "app-create",
    standalone: true,
    imports: [
        CustomButtonComponent,
        ReactiveFormsModule,
        CommonModule,
        FormGroupComponent,
    ],
    templateUrl: "./create.component.html",
    styleUrls: ["./create.component.scss"],
})
export class CreateComponent {
    constructor(
        private router: Router,
        private store: Store,
        private videoService: VideoService,
    ) {
        this.createForm.patchValue({ creationDate: this.getCurrentDate() });
    }

    public createForm = new FormGroup({
        title: new FormControl("", [
            Validators.required,
            Validators.minLength(VALIDATION_FORM.TITLE_MIN_LENGTH),
            Validators.maxLength(VALIDATION_FORM.TITLE_MAX_LENGTH),
        ]),
        description: new FormControl("", [
            Validators.maxLength(VALIDATION_FORM.DESCRIPTION_MAX_LENGTH),
        ]),
        img: new FormControl("", [Validators.required]),
        link: new FormControl("", [Validators.required]),
        creationDate: new FormControl("", [
            Validators.required,
            this.dateInFutureValidator,
        ]),
        tags: new FormArray([this.createTagControl()]),
    });

    createTagControl(): FormControl {
        return new FormControl("", Validators.required);
    }

    get tags(): FormArray {
        return this.createForm.get("tags") as FormArray;
    }

    addItem(): void {
        if (this.tags.length < VALIDATION_FORM.MAX_TAGS) {
            this.tags.push(this.createTagControl());
        }
    }

    removeItem(index: number): void {
        if (this.tags.length > VALIDATION_FORM.MIN_TAGS) {
            this.tags.removeAt(index);
        }
    }

    onSubmit() {
        if (this.createForm.valid) {
            const customVideo = this.videoService.createCustomVideo(
                this.createForm.get("title")?.value ?? "",
                this.createForm.get("description")?.value ?? "",
                this.createForm.get("img")?.value ?? "",
                this.createForm.get("link")?.value ?? "",
                this.createForm.get("creationDate")?.value ?? "",
                this.createForm.get("tags")?.value ?? [],
            );
            this.store.dispatch(
                CustomCardActions.addCustomCard({ video: customVideo }),
            );
            this.router.navigate(["/search"]);
        } else {
            alert("Invalid input in card creation form.");
        }
    }

    clearForm() {
        this.createForm.reset();
        while (this.tags.length > VALIDATION_FORM.MIN_TAGS) {
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

    private getCurrentDate(): string {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    }
}
