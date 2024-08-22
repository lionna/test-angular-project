import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-custom-button",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./custom-button.component.html",
    styleUrl: "./custom-button.component.scss",
})
export class CustomButtonComponent {
    @Output() buttonClick = new EventEmitter<void>();
    @Input() height: string | undefined;
    @Input() width: string | undefined;
    @Input() backgroundColor: string | undefined;
    @Input() disabled: boolean | undefined;

    onClick() {
        this.buttonClick.emit();
    }
}
