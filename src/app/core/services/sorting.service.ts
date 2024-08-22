import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { SortingBy } from "../enums/sorting-by.enum";
import { SortingOrder } from "../enums/sorting-order.enum";

@Injectable({
    providedIn: "root",
})
export class SortingService {
    private searchQuerySubject = new BehaviorSubject<string>("");

    searchQuery$ = this.searchQuerySubject.asObservable();
    private sortingBySubject = new BehaviorSubject<SortingBy>(SortingBy.Date);
    sortingBy$ = this.sortingBySubject.asObservable();
    private sortingOrderSubject = new BehaviorSubject<SortingOrder>(
        SortingOrder.Asc,
    );
    sortingOrder$ = this.sortingOrderSubject.asObservable();
    private filterTextSubject = new BehaviorSubject<string>("");
    filterText$ = this.filterTextSubject.asObservable();

    setSearchQuery(query: string) {
        this.searchQuerySubject.next(query);
    }

    setSortingBy(sortingBy: SortingBy) {
        this.sortingBySubject.next(sortingBy);
    }

    setSortingOrder(sortingOrder: SortingOrder) {
        this.sortingOrderSubject.next(sortingOrder);
    }

    setFilterText(filterText: string) {
        this.filterTextSubject.next(filterText);
    }
}
