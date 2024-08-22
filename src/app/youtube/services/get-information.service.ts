import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";

@Injectable({
    providedIn: "root"
})
export class GetInformationService {
    private url: string = "assets/youtube-response.json";

    constructor(private http: HttpClient) {}

    fetchSearchItems(): Observable<VideoItem[]> {
        return this.http.get<{ items: VideoItem[] }>(this.url).pipe(
            map((response) => response.items)
        );
    }
}
