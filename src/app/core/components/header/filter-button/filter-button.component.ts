import { Component, EventEmitter, Output } from "@angular/core";

import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";

@Component({
    selector: "app-filter-button",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./filter-button.component.html",
    styleUrl: "./filter-button.component.scss",
})
export class FilterButtonComponent {
    @Output() toggle = new EventEmitter<void>();

    toggleFilter() {
        this.toggle.emit();
    }
}
