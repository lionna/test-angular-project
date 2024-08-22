import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { VideoItem } from "../interfaces/videoItem.interface";
import { updateCounter } from "../utils/counter-utils";

@Injectable({
    providedIn: "root",
})
export class LikeService {
    private videoItemsSubject = new BehaviorSubject<VideoItem[]>([]);
    videoItems$ = this.videoItemsSubject.asObservable();

    updateLikeStatus(item: VideoItem, isLiked: boolean): void {
        const updatedItems = this.videoItemsSubject.value.map((videoItem) => (videoItem.id === item.id
            ? this.getUpdatedItem(videoItem, isLiked)
            : videoItem));

        this.videoItemsSubject.next(updatedItems);
    }

    setVideoItems(items: VideoItem[]): void {
        this.videoItemsSubject.next([...items]);
    }

    private getUpdatedItem(item: VideoItem, isLiked: boolean): VideoItem {
        return {
            ...item,
            statistics: {
                ...item.statistics,
                isLiked,
                likeCount: updateCounter(item.statistics.likeCount, isLiked)
            }
        };
    }
}
