import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";
import { updateCounter } from "../../shared/utils/counter-utils";

@Injectable({
    providedIn: "root",
})
export class LikeService {
    private videoItemsSubject = new BehaviorSubject<VideoItem[]>([]);
    videoItems$ = this.videoItemsSubject.asObservable();

    updateLikeStatus(items: VideoItem[], item: VideoItem, isLiked: boolean): VideoItem[] {
        const updatedItems = items
            .map((videoItem) => (videoItem.id === item.id ? this.getUpdatedItem(videoItem, isLiked) : videoItem));

        this.videoItemsSubject.next(updatedItems);
        return updatedItems;
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

    setVideoItems(items: VideoItem[]): void {
        this.videoItemsSubject.next(items);
    }
}
