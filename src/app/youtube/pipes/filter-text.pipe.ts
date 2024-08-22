import { Pipe, PipeTransform } from "@angular/core";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";

@Pipe({
    name: "filterTextPipe",
    standalone: true,
})
export class FilterTextPipe implements PipeTransform {
    transform(items: VideoItem[], filterText: string): VideoItem[] {
        if (!items) return [];
        if (!filterText) return items;

        const lowerCaseFilter = filterText.toLowerCase();
        return items.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(lowerCaseFilter),
        );
    }
}
