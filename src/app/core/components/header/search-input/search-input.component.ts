import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-search-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./search-input.component.html",
    styleUrl: "./search-input.component.scss"
})
export class SearchInputComponent {
    searchQuery = "";

    @Output() searchQueryChange = new EventEmitter<string>();

    searchItems() {
        this.searchQueryChange.emit(this.searchQuery);
    }
}
