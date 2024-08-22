import { Component } from "@angular/core";

import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";

@Component({
    selector: "app-add-item-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./add-item-button.component.html",
    styleUrl: "./add-item-button.component.scss",
})
export class AddItemButtonComponent {}
