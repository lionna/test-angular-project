import { Component } from "@angular/core";

import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    selector: "app-add-favorite-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./add-favorite-button.component.html",
    styleUrl: "./add-favorite-button.component.scss",
})
export class AddFavoriteButtonComponent {}
