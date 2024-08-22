import { CommonModule, DatePipe } from "@angular/common";
import {
    Component, EventEmitter, OnInit, Output
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CommentsCountComponent } from "../../../shared/components/comments-count/comments-count.component";
import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { DislikesCountComponent } from "../../../shared/components/dislikes-count/dislikes-count.component";
import { LikesCountComponent } from "../../../shared/components/likes-count/likes-count.component";
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
        CustomButtonComponent
    ],
    providers: [DatePipe],
    templateUrl: "./detail.component.html",
    styleUrl: "./detail.component.scss"
})
export class DetailComponent implements OnInit {
    public videoItem!: VideoItem;
    @Output() likeChange = new EventEmitter<VideoItem>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private getInfoService: GetInformationService
    ) {}

    onLike() {
        this.likeChange.emit(this.videoItem);
        this.videoItem.statistics.isLiked = !this.videoItem.statistics.isLiked;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get("id");
            if (id) {
                this.getInfoService.searchItemById(id).subscribe((item) => {
                    if (item) {
                        this.videoItem = item;
                    } else {
                        this.router.navigate(["/404"]);
                    }
                });
            } else {
                this.router.navigate(["/404"]);
            }
        });
    }

    onBack() {
        this.router.navigate(["/search"]);
    }
}
