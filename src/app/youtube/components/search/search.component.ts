import { CommonModule } from "@angular/common";
import {
    Component, OnChanges, OnInit, SimpleChanges
} from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { SortingBy } from "../../../core/enums/sorting-by.enum";
import { SortingOrder } from "../../../core/enums/sorting-order.enum";
import { SortingService } from "../../../core/services/sorting.service";
import { VideoItem } from "../../../shared/interfaces/videoItem.interface";
import { FilterTextPipe } from "../../pipes/filter-text.pipe";
import { GetInformationService } from "../../services/get-information.service";
import { LikeService } from "../../services/like.service";
import { SortService } from "../../services/sort.service";
import { SearchItemComponent } from "./search-item/search-item.component";

@Component({
    selector: "app-search",
    standalone: true,
    imports: [CommonModule, SearchItemComponent, FilterTextPipe],
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnChanges {
    searchQuery: string = "";
    sortBy: SortingBy = SortingBy.Date;
    sortOrder: SortingOrder = SortingOrder.Asc;
    filterText: string = "";
    searchItems: VideoItem[] = [];
    filteredItems: VideoItem[] = [];
    videoItems$: Observable<VideoItem[]>;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private searchService: GetInformationService,
        private sortService: SortService,
        private sortingService: SortingService,
        private likeService: LikeService,
    ) {
        this.videoItems$ = this.likeService.videoItems$;
    }

    handleLike(videoItem: VideoItem) {
        const newLikeStatus = !videoItem.statistics.isLiked;
        this.searchItems = this.likeService.updateLikeStatus(
            this.searchItems,
            videoItem,
            newLikeStatus,
        );
        this.applyFilter();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.sortingService.searchQuery$.subscribe((query) => {
                if (query) {
                    this.searchQuery = query;
                    this.fetchSearchItems(query).subscribe({
                        next: (items) => {
                            this.searchItems = items;
                            this.applyFilter();
                        },
                        error: (error) => console.error("Error fetching the data: ", error),
                    });
                }
            }),
        );
        this.subscriptions.add(
            this.sortingService.sortingBy$.subscribe((sortBy) => {
                this.sortBy = sortBy;
                this.applyFilter();
            })
        );

        this.subscriptions.add(
            this.sortingService.sortingOrder$.subscribe((sortOrder) => {
                this.sortOrder = sortOrder;
                this.applyFilter();
            })
        );

        this.subscriptions.add(
            this.sortingService.filterText$.subscribe((filterText) => {
                this.filterText = filterText;
                this.applyFilter();
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["searchQuery"] || changes["sortBy"] || changes["sortOrder"]) {
            this.applyFilter();
        } else {
            this.filteredItems = this.searchItems;
        }
    }

    fetchSearchItems(query: string): Observable<VideoItem[]> {
        return this.searchService.fetchSearchItems(query);
    }

    private applyFilter(): void {
        this.filteredItems = this.searchItems;
        this.sortItems();
    }

    private sortItems(): void {
        this.filteredItems = this.sortService.sortItems(
            this.filteredItems,
            this.sortBy,
            this.sortOrder,
        );
    }
}
