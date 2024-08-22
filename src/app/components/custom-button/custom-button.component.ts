import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-custom-button",
    standalone: true,
    imports: [],
    templateUrl: "./custom-button.component.html",
    styleUrl: "./custom-button.component.scss"
})
export class CustomButtonComponent {
    @Output() buttonClick = new EventEmitter<void>();

    onClick() {
        this.buttonClick.emit();
    }
}
