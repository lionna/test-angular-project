import { Component, Input } from "@angular/core";

@Component({
    selector: "app-video-thumbnail",
    standalone: true,
    imports: [],
    templateUrl: "./video-thumbnail.component.html",
    styleUrl: "./video-thumbnail.component.scss"
})
export class VideoThumbnailComponent {
    @Input() thumbnailUrl!: string;
    @Input() width!: number;
    @Input() height!: number;
}
