import { CommonModule } from "@angular/common";
import {
    Component, EventEmitter, Input, Output
} from "@angular/core";

import { BorderItemDirective } from "../../../directives/border-item.directive";
import { VideoItem } from "../../../interfaces/videoItem.interface";
import { CommentsCountComponent } from "./comments-count/comments-count.component";
import { DislikesCountComponent } from "./dislikes-count/dislikes-count.component";
import { LikesCountComponent } from "./likes-count/likes-count.component";
import { MoreButtonComponent } from "./more-button/more-button.component";
import { VideoThumbnailComponent } from "./video-thumbnail/video-thumbnail.component";
import { ViewsCountComponent } from "./views-count/views-count.component";

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

    onLike() {
        this.likeChange.emit(this.videoItem);
    }
}
