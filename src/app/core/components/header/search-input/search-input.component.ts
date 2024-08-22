import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";

@Component({
    selector: "app-search-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./search-input.component.html",
    styleUrl: "./search-input.component.scss",
})
export class SearchInputComponent {
    searchQuery = "";
    private searchSubject = new Subject<string>();

    @Output() searchQueryChange = new EventEmitter<string>();

    constructor() {
        this.searchSubject
            .pipe(
                debounceTime(1000),
                filter((query) => query.length >= 3),
            )
            .subscribe((query) => {
                this.searchQueryChange.emit(query);
            });
    }

    searchItems() {
        this.searchSubject.next(this.searchQuery);
    }
}
