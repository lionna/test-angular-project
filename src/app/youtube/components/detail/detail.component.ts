import { CommonModule, DatePipe } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, Observable, of, switchMap, tap } from "rxjs";

import { removeCustomCard } from "../../../redux/actions/custom-cards.actions";
import {
    addFavorite,
    removeFavorite,
} from "../../../redux/actions/favorite.actions";
import {
    selectCustomCardById,
    selectIsCustom,
} from "../../../redux/selectors/custom-cards.selectors";
import { selectIsFavorite } from "../../../redux/selectors/favorite.selectors";
import { AddFavoriteButtonComponent } from "../../../shared/components/add-favorite-button/add-favorite-button.component";
import { CommentsCountComponent } from "../../../shared/components/comments-count/comments-count.component";
import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { DislikesCountComponent } from "../../../shared/components/dislikes-count/dislikes-count.component";
import { FavoriteButtonComponent } from "../../../shared/components/favorite-button/favorite-button.component";
import { LikesCountComponent } from "../../../shared/components/likes-count/likes-count.component";
import { RemoveButtonComponent } from "../../../shared/components/remove-button/remove-button.component";
import { ViewsCountComponent } from "../../../shared/components/views-count/views-count.component";
import { VideoItem } from "../../../shared/interfaces/videoItem.interface";
import { BorderItemDirective } from "../../directives/border-item.directive";
import { ColorItemDirective } from "../../directives/color-item.directive";
import { GetInformationService } from "../../services/get-information.service";
import { MoreButtonComponent } from "../search/search-item/more-button/more-button.component";
import { VideoThumbnailComponent } from "../search/search-item/video-thumbnail/video-thumbnail.component";

@Component({
    selector: "app-detail",
    standalone: true,
    imports: [
        CommonModule,
        CommentsCountComponent,
        DislikesCountComponent,
        LikesCountComponent,
        MoreButtonComponent,
        VideoThumbnailComponent,
        ViewsCountComponent,
        BorderItemDirective,
        ColorItemDirective,
        CustomButtonComponent,
        AddFavoriteButtonComponent,
        FavoriteButtonComponent,
        RemoveButtonComponent,
    ],
    providers: [DatePipe],
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
    public videoItem!: VideoItem;
    @Output() likeChange = new EventEmitter<VideoItem>();
    isFavorite$: Observable<boolean>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private getInfoService: GetInformationService,
        private store: Store,
    ) {
        this.isFavorite$ = this.store.select(
            selectIsFavorite(this.videoItem?.id),
        );
    }

    onLike() {
        this.likeChange.emit(this.videoItem);
        this.videoItem.statistics.isLiked = !this.videoItem.statistics.isLiked;
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((params) => this.handleRouteParams(params)),
                switchMap((id) => this.handleId(id)),
                catchError(() => this.handleError()),
            )
            .subscribe();
    }

    private handleRouteParams(params: ParamMap): Observable<string | null> {
        const id = params.get("id");
        if (!id) {
            this.router.navigate(["/404"]);
            return of(null);
        }
        return of(id);
    }

    private handleId(id: string | null): Observable<VideoItem | undefined> {
        if (!id) {
            return of(undefined);
        }

        return this.store.select(selectIsCustom(id)).pipe(
            switchMap((isCustom) => {
                if (isCustom) {
                    return this.store.select(selectCustomCardById(id)).pipe(
                        tap((customItem) => {
                            if (customItem) {
                                this.videoItem = customItem;
                            }
                        }),
                    );
                }
                return this.getInfoService.searchItemById(id).pipe(
                    tap((item) => {
                        if (item) {
                            this.videoItem = item;
                            this.isFavorite$ = this.store.select(
                                selectIsFavorite(this.videoItem?.id),
                            );
                        } else {
                            this.router.navigate(["/404"]);
                        }
                    }),
                );
            }),
        );
    }

    private handleError(): Observable<never> {
        this.router.navigate(["/404"]);
        return of();
    }

    onBack() {
        this.router.navigate(["/search"]);
    }

    onAddFavorite() {
        this.store.dispatch(addFavorite({ video: this.videoItem }));
    }

    onRemoveFavorite() {
        this.store.dispatch(removeFavorite({ videoId: this.videoItem.id }));
    }

    onRemoveCustom() {
        this.store.dispatch(removeCustomCard({ videoId: this.videoItem.id }));
    }
}
