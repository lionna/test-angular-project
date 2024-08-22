import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

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
export class FavoriteListComponent {
    favoriteVideos$: Observable<VideoItem[]> = new Observable();

    constructor(private store: Store) {
        this.favoriteVideos$ = this.store.select(selectAllFavorites);
    }
}
