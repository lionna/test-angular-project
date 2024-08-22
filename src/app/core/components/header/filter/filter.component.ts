import { Component, EventEmitter, Output } from "@angular/core";

import { SortingBy } from "../../../enums/sorting-by.enum";
import { SortingOrder } from "../../../enums/sorting-order.enum";
import { SortButtonsComponent } from "./sort-buttons/sort-buttons.component";
import { WordFilterInputComponent } from "./word-filter-input/word-filter-input.component";

@Component({
    selector: "app-filter",
    standalone: true,
    imports: [SortButtonsComponent, WordFilterInputComponent],
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"],
})
export class FilterComponent {
    @Output() sortChange = new EventEmitter<{
        sortBy: SortingBy;
        sortOrder: SortingOrder;
    }>();
    @Output() filterTextChange = new EventEmitter<string>();

    onSortChange(sortEvent: { sortBy: SortingBy; sortOrder: SortingOrder }) {
        this.sortChange.emit(sortEvent);
    }

    onFilterTextChange(filterText: string) {
        this.filterTextChange.emit(filterText);
    }
}
