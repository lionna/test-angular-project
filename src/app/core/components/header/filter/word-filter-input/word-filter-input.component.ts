import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-word-filter-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./word-filter-input.component.html",
    styleUrl: "./word-filter-input.component.scss"
})
export class WordFilterInputComponent {
    public filterInput = "";
    @Output() filterChange = new EventEmitter<string>();

    onInputChange() {
        this.filterChange.emit(this.filterInput);
    }
}
