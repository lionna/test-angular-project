import { Component } from "@angular/core";

import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    selector: "app-favorite-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./favorite-button.component.html",
    styleUrl: "./favorite-button.component.scss",
})
export class FavoriteButtonComponent {}
