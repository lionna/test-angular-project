import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { SearchComponent } from "../../../youtube/components/search/search.component";
import { SortingBy } from "../../enums/sorting-by.enum";
import { SortingOrder } from "../../enums/sorting-order.enum";
import { SortingService } from "../../services/sorting.service";
import { FilterComponent } from "./filter/filter.component";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { LoginInfoComponent } from "./login-info/login-info.component";
import { LogoComponent } from "./logo/logo.component";
import { SearchInputComponent } from "./search-input/search-input.component";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        CommonModule,
        FilterComponent,
        FilterButtonComponent,
        LoginInfoComponent,
        LogoComponent,
        SearchInputComponent,
        SearchComponent,
        RouterLink,
    ],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    isExpanded = false;
    searchQuery = "";
    sortBy: SortingBy = SortingBy.Date;
    sortOrder: SortingOrder = SortingOrder.Asc;
    filterText = "";
    isSearchInitiated = false;

    @ViewChild(SearchInputComponent)
    searchInputComponent!: SearchInputComponent;

    constructor(
        private sortingService: SortingService,
        private router: Router,
    ) {}

    toggleFilter() {
        this.isExpanded = !this.isExpanded;
    }

    onSearchQueryChange(query: string) {
        this.searchQuery = query || " ";
        this.isSearchInitiated = true;
        this.sortingService.setSearchQuery(this.searchQuery);
    }

    onSortChange({
        sortBy,
        sortOrder,
    }: {
        sortBy: SortingBy;
        sortOrder: SortingOrder;
    }) {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.sortingService.setSortingBy(sortBy);
        this.sortingService.setSortingOrder(sortOrder);
    }

    onFilterTextChange(filterText: string) {
        this.filterText = filterText;
        this.sortingService.setFilterText(filterText);
    }

    onIndexPage() {
        this.router.navigate(["/search"]);
    }
}
