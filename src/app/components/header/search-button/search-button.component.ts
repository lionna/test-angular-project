import { Component, EventEmitter, Output } from "@angular/core";

import { CustomButtonComponent } from "../../custom-button/custom-button.component";

@Component({
    selector: "app-search-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./search-button.component.html",
    styleUrl: "./search-button.component.scss"
})
export class SearchButtonComponent {
    @Output() searchClick = new EventEmitter<void>();

    onSearchClick() {
        this.searchClick.emit();
    }
}
