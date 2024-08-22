import { Injectable, signal } from "@angular/core";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";
import { updateCounter } from "../../shared/utils/counter-utils";

@Injectable({
    providedIn: "root",
})
export class LikeService {
    videoItemsSignal = signal<VideoItem[]>([]);

    updateLikeStatus(
        items: VideoItem[],
        item: VideoItem,
        isLiked: boolean,
    ): VideoItem[] {
        const updatedItems = items.map((videoItem) =>
            videoItem.id === item.id
                ? this.getUpdatedItem(videoItem, isLiked)
                : videoItem,
        );

        this.videoItemsSignal.set(updatedItems);
        return updatedItems;
    }

    private getUpdatedItem(item: VideoItem, isLiked: boolean): VideoItem {
        return {
            ...structuredClone(item),
            statistics: {
                ...item.statistics,
                isLiked,
                likeCount: updateCounter(
                    item.statistics?.likeCount ?? "0",
                    isLiked,
                ),
            },
        };
    }

    setVideoItems(items: VideoItem[]): void {
        this.videoItemsSignal.set(items);
    }
}
