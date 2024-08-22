import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

import { SortingBy } from "../../enums/sorting-by.enum";
import { SortingOrder } from "../../enums/sorting-order.enum";
import { SearchComponent } from "../search/search.component";
import { FilterComponent } from "./filter/filter.component";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { LoginInfoComponent } from "./login-info/login-info.component";
import { LogoComponent } from "./logo/logo.component";
import { SearchButtonComponent } from "./search-button/search-button.component";
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
        SearchButtonComponent,
        SearchInputComponent,
        SearchComponent
    ],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    isExpanded = false;
    searchQuery = "";
    sortBy: SortingBy = SortingBy.Date;
    sortOrder: SortingOrder = SortingOrder.Asc;
    filterText = "";
    isSearchInitiated = false;

    @ViewChild(SearchInputComponent) searchInputComponent!: SearchInputComponent;

    toggleFilter() {
        this.isExpanded = !this.isExpanded;
    }

    onSearchQueryChange(query: string) {
        this.searchQuery = query;
    }

    onSearchClick() {
        this.searchQuery = this.searchInputComponent.searchQuery || " ";
        this.isSearchInitiated = true;
    }

    onSortChange({ sortBy, sortOrder }: { sortBy: SortingBy, sortOrder: SortingOrder }) {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

    onFilterTextChange(filterText: string) {
        this.filterText = filterText;
    }
}
