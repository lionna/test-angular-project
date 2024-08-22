import { CommonModule } from "@angular/common";
import {
    Component, EventEmitter, Input, Output
} from "@angular/core";
import { Router } from "@angular/router";

import { CommentsCountComponent } from "../../../../shared/components/comments-count/comments-count.component";
import { DislikesCountComponent } from "../../../../shared/components/dislikes-count/dislikes-count.component";
import { LikesCountComponent } from "../../../../shared/components/likes-count/likes-count.component";
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
        BorderItemDirective
    ],
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent {
    @Input() videoItem!: VideoItem;
    @Output() likeChange = new EventEmitter<VideoItem>();
    @Output() moreInfo = new EventEmitter<string>();

    constructor(private router: Router) {}

    onLike() {
        this.likeChange.emit(this.videoItem);
    }

    onMoreInfo() {
        this.router.navigate(["/detail", this.videoItem.id], { state: { videoItem: this.videoItem } });
    }
}
