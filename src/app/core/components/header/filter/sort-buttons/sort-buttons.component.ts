import { Component, EventEmitter, Output } from "@angular/core";

import { SortingBy } from "../../../../enums/sorting-by.enum";
import { SortingOrder } from "../../../../enums/sorting-order.enum";

@Component({
    selector: "app-sort-buttons",
    standalone: true,
    templateUrl: "./sort-buttons.component.html",
    styleUrls: ["./sort-buttons.component.scss"],
})
export class SortButtonsComponent {
    @Output() sortChange = new EventEmitter<{
        sortBy: SortingBy;
        sortOrder: SortingOrder;
    }>();

    sortingConfig = [
        { key: SortingBy.Date, label: "date", id: 1 },
        { key: SortingBy.Views, label: "count of views", id: 2 },
    ];

    sortBy: SortingBy = SortingBy.Date;
    sortOrder: SortingOrder = SortingOrder.Asc;

    onSortChange(sortOption: SortingBy) {
        if (this.sortBy === sortOption) {
            this.sortOrder =
                this.sortOrder === SortingOrder.Asc
                    ? SortingOrder.Desc
                    : SortingOrder.Asc;
        } else {
            this.sortBy = sortOption;
            this.sortOrder = SortingOrder.Asc;
        }
        this.sortChange.emit({
            sortBy: this.sortBy,
            sortOrder: this.sortOrder,
        });
    }
}
