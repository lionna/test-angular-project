import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { Store } from "@ngrx/store";

import { selectAllFavorites } from "../../../redux/selectors/favorite.selectors";
import { VideoItem } from "../../../shared/interfaces/videoItem.interface";
import { SearchItemComponent } from "../../../youtube/components/search/search-item/search-item.component";

@Component({
    selector: "app-favorite-list",
    standalone: true,
    imports: [CommonModule, SearchItemComponent],
    templateUrl: "./favorite-list.component.html",
    styleUrls: ["./favorite-list.component.scss"],
})
export class FavoriteListComponent implements OnInit {
    favoriteVideos = signal<VideoItem[]>([]);

    constructor(private store: Store) {}

    ngOnInit(): void {
        // eslint-disable-next-line @ngrx/no-store-subscription
        this.store.select(selectAllFavorites).subscribe((favorites) => {
            this.favoriteVideos.set(favorites);
        });
    }
}
