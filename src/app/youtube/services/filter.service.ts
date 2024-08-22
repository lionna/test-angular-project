import { Injectable } from "@angular/core";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";

@Injectable({
    providedIn: "root"
})
export class FilterService {
    filterItems(items: VideoItem[], searchQuery: string): VideoItem[] {
        let filteredItems = items;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredItems = filteredItems.filter((item) => item.snippet.title.toLowerCase().includes(query));
        }

        return filteredItems;
    }
}
