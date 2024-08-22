import { Component } from "@angular/core";

import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    selector: "app-remove-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./remove-button.component.html",
    styleUrl: "./remove-button.component.scss",
})
export class RemoveButtonComponent {}
