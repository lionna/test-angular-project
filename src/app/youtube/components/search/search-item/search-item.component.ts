import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";

import { removeCustomCard } from "../../../../redux/actions/custom-cards.actions";
import {
    addFavorite,
    removeFavorite,
} from "../../../../redux/actions/favorite.actions";
import { selectIsFavorite } from "../../../../redux/selectors/favorite.selectors";
import { AddFavoriteButtonComponent } from "../../../../shared/components/add-favorite-button/add-favorite-button.component";
import { CommentsCountComponent } from "../../../../shared/components/comments-count/comments-count.component";
import { DislikesCountComponent } from "../../../../shared/components/dislikes-count/dislikes-count.component";
import { FavoriteButtonComponent } from "../../../../shared/components/favorite-button/favorite-button.component";
import { LikesCountComponent } from "../../../../shared/components/likes-count/likes-count.component";
import { RemoveButtonComponent } from "../../../../shared/components/remove-button/remove-button.component";
import { ViewsCountComponent } from "../../../../shared/components/views-count/views-count.component";
import { VideoItem } from "../../../../shared/interfaces/videoItem.interface";
import { BorderItemDirective } from "../../../directives/border-item.directive";
import { MoreButtonComponent } from "./more-button/more-button.component";
import { VideoThumbnailComponent } from "./video-thumbnail/video-thumbnail.component";

@Component({
    selector: "app-search-item",
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
        FavoriteButtonComponent,
        AddFavoriteButtonComponent,
        RemoveButtonComponent,
    ],
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"],
})
export class SearchItemComponent implements OnInit {
    @Input() videoItem!: VideoItem;
    @Output() likeChange = new EventEmitter<VideoItem>();
    @Output() moreInfo = new EventEmitter<string>();
    isFavorite$: Observable<boolean>;

    constructor(
        private router: Router,
        private store: Store,
    ) {
        this.isFavorite$ = this.store.select(
            selectIsFavorite(this.videoItem?.id),
        );
    }

    ngOnInit(): void {
        this.isFavorite$ = this.store.select(
            selectIsFavorite(this.videoItem?.id),
        );
    }

    onLike() {
        this.likeChange.emit(this.videoItem);
    }

    onMoreInfo() {
        this.router.navigate(["/detail", this.videoItem.id], {
            state: { videoItem: this.videoItem },
        });
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
