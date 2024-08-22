import { Injectable } from "@angular/core";

import { SortingBy } from "../../core/enums/sorting-by.enum";
import { SortingOrder } from "../../core/enums/sorting-order.enum";
import { VideoItem } from "../../shared/interfaces/videoItem.interface";

@Injectable({
    providedIn: "root",
})
export class SortService {
    private getPublishedAtTimestamp(item: VideoItem): number {
        return new Date(item?.snippet?.publishedAt ?? new Date()).getTime();
    }

    private parseIntWithDefault(
        value: string | undefined,
        defaultValue: number,
    ): number {
        return value ? parseInt(value, 10) || defaultValue : defaultValue;
    }

    sortItems(
        items: VideoItem[],
        sortBy: SortingBy,
        sortOrder: SortingOrder,
    ): VideoItem[] {
        const newItems = [...items];
        return newItems.sort((a, b) => {
            const timestampA = this.getPublishedAtTimestamp(a);
            const timestampB = this.getPublishedAtTimestamp(b);

            if (sortBy === SortingBy.Date) {
                return sortOrder === SortingOrder.Asc
                    ? timestampA - timestampB
                    : timestampB - timestampA;
            }
            if (sortBy === SortingBy.Views) {
                const viewsA = this.parseIntWithDefault(
                    a.statistics?.viewCount ?? "0",
                    0,
                );
                const viewsB = this.parseIntWithDefault(
                    b.statistics?.viewCount ?? "0",
                    0,
                );

                return sortOrder === SortingOrder.Asc
                    ? viewsA - viewsB
                    : viewsB - viewsA;
            }
            return 0;
        });
    }
}
