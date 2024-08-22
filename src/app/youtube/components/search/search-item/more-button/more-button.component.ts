import { Component } from "@angular/core";

import { CustomButtonComponent } from "../../../../../shared/components/custom-button/custom-button.component";

@Component({
    selector: "app-more-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./more-button.component.html",
    styleUrl: "./more-button.component.scss"
})
export class MoreButtonComponent {

}
