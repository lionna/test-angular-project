import { CommonModule } from "@angular/common";
import {
    Component, Input, OnChanges, OnInit, SimpleChanges
} from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { SortingBy } from "../../enums/sorting-by.enum";
import { SortingOrder } from "../../enums/sorting-order.enum";
import { VideoItem } from "../../interfaces/videoItem.interface";
import { FilterTextPipe } from "../../pipes/filter-text.pipe";
import { FilterService } from "../../services/filter.service";
import { GetInformationService } from "../../services/get-information.service";
import { LikeService } from "../../services/like.service";
import { SortService } from "../../services/sort.service";
import { SearchItemComponent } from "./search-item/search-item.component";

@Component({
    selector: "app-search",
    standalone: true,
    imports: [
        CommonModule,
        SearchItemComponent,
        FilterTextPipe
    ],
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnChanges {
    @Input() searchQuery: string = "";
    @Input() sortBy: SortingBy = SortingBy.Date;
    @Input() sortOrder: SortingOrder = SortingOrder.Asc;
    @Input() filterText: string = "";
    searchItems: VideoItem[] = [];
    filteredItems: VideoItem[] = [];

    constructor(
        private searchService: GetInformationService,
        private filterService: FilterService,
        private sortService: SortService,
        private likeService: LikeService
    ) {}

    handleLike(videoItem: VideoItem) {
        const newLikeStatus = !videoItem.statistics.isLiked;
        this.likeService.updateLikeStatus(videoItem, newLikeStatus);
    }

    ngOnInit(): void {
        this.fetchSearchItems().subscribe({
            next: (items) => {
                this.searchItems = items;
                this.likeService.setVideoItems(items);
            },
            error: (error) => console.error("Error fetching the data: ", error)
        });

        this.likeService.videoItems$.pipe(
            map((items) => {
                this.searchItems = items;
            })
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["searchQuery"] || changes["sortBy"] || changes["sortOrder"]) {
            this.applyFilter();
        } else {
            this.filteredItems = this.searchItems;
        }
    }

    fetchSearchItems(): Observable<VideoItem[]> {
        return this.searchService.fetchSearchItems();
    }

    private applyFilter(): void {
        this.filteredItems = this.filterService.filterItems(
            this.searchItems,
            this.searchQuery
        );

        this.sortItems();
    }

    private sortItems(): void {
        this.filteredItems = this.sortService.sortItems(
            this.filteredItems,
            this.sortBy,
            this.sortOrder
        );
    }
}
