import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import {
    BehaviorSubject,
    combineLatest,
    filter,
    map,
    Observable,
    startWith,
    Subscription,
    switchMap,
} from "rxjs";

import { SortingBy } from "../../../core/enums/sorting-by.enum";
import { SortingOrder } from "../../../core/enums/sorting-order.enum";
import { SortingService } from "../../../core/services/sorting.service";
import { loadYouTubeVideos } from "../../../redux/actions/videos.actions";
import { selectAllCustomCards } from "../../../redux/selectors/custom-cards.selectors";
import {
    selectAllVideos,
    selectCurrentQuery,
    selectLoading,
} from "../../../redux/selectors/videos.selectors";
import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { PaginationComponent } from "../../../shared/components/pagination.component";
import { CustomVideoItem } from "../../../shared/interfaces/customVideoItem.interface";
import { VideoItem } from "../../../shared/interfaces/videoItem.interface";
import { FilterTextPipe } from "../../pipes/filter-text.pipe";
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
        FilterTextPipe,
        CustomButtonComponent,
        PaginationComponent,
    ],
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnDestroy {
    searchQuery: string = "";
    sortBy: SortingBy = SortingBy.Date;
    sortOrder: SortingOrder = SortingOrder.Asc;
    filterText: string = "";
    searchItems: VideoItem[] = [];
    filteredItems: VideoItem[] = [];
    customVideos: CustomVideoItem[] = [];
    paginatedItems: VideoItem[] = [];

    private subscriptions: Subscription = new Subscription();
    videos$: Observable<VideoItem[]> = new Observable();
    customVideos$: Observable<CustomVideoItem[]> = new Observable();
    loading$: Observable<boolean>;
    private previousQuery$: Observable<string>;

    currentPage = new BehaviorSubject<number>(1);
    itemsPerPage = signal<number>(20);
    totalPages = signal<number>(1);

    constructor(
        private searchService: GetInformationService,
        private sortService: SortService,
        private sortingService: SortingService,
        private likeService: LikeService,
        private store: Store,
    ) {
        this.customVideos$ = this.store.select(selectAllCustomCards);
        this.loading$ = this.store.select(selectLoading);
        this.previousQuery$ = this.store.select(selectCurrentQuery);
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
        this.videos$ = combineLatest([
            this.store.select(selectAllVideos),
            // eslint-disable-next-line @ngrx/avoid-combining-selectors
            this.store.select(selectAllCustomCards),
            this.sortingService.sortingBy$.pipe(startWith(this.sortBy)),
            this.sortingService.sortingOrder$.pipe(startWith(this.sortOrder)),
            this.sortingService.filterText$.pipe(startWith(this.filterText)),
            this.currentPage,
        ]).pipe(
            map(
                ([
                    items,
                    customItems,
                    sortBy,
                    sortOrder,
                    filterText,
                    currentPage,
                ]) => {
                    const sortedItems = this.sortService.sortItems(
                        items,
                        sortBy,
                        sortOrder,
                    );

                    let allItems = [...customItems, ...sortedItems];

                    if (filterText) {
                        const lowerCaseFilter = filterText.toLowerCase();
                        allItems = allItems.filter((item) =>
                            JSON.stringify(item)
                                .toLowerCase()
                                .includes(lowerCaseFilter),
                        );
                    }

                    this.totalPages.set(
                        Math.ceil(allItems.length / this.itemsPerPage()),
                    );

                    const paginatedItems = allItems.slice(
                        (currentPage - 1) * this.itemsPerPage(),
                        currentPage * this.itemsPerPage(),
                    );
                    return paginatedItems;
                },
            ),
        );
        this.subscriptions.add(
            this.sortingService.searchQuery$
                .pipe(
                    switchMap((query) =>
                        combineLatest([
                            this.loading$.pipe(filter((loading) => !loading)),
                            this.previousQuery$,
                        ]).pipe(
                            switchMap(([, previousQuery]) => {
                                if (query !== previousQuery) {
                                    this.store.dispatch(
                                        loadYouTubeVideos({ query }),
                                    );
                                    return this.videos$;
                                }
                                return this.videos$.pipe(startWith([]));
                            }),
                        ),
                    ),
                )
                .subscribe(),
        );

        this.subscriptions.add(
            this.sortingService.filterText$.subscribe((filterText) => {
                this.filterText = filterText;
                this.applyFilter();
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private applyFilter(): void {
        this.filteredItems = this.searchItems;
        if (this.filterText) {
            const lowerCaseFilter = this.filterText.toLowerCase();
            this.filteredItems = this.filteredItems.filter((item) =>
                JSON.stringify(item).toLowerCase().includes(lowerCaseFilter),
            );
        }
        this.sortItems();
        this.combineItems();
    }

    private combineItems(): void {
        this.filteredItems = [...this.customVideos, ...this.filteredItems];
    }

    private sortItems(): void {
        this.filteredItems = this.sortService.sortItems(
            this.filteredItems,
            this.sortBy,
            this.sortOrder,
        );
    }
}
