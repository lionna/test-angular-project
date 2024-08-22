import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, map, switchMap } from "rxjs/operators";

import { VideoItem } from "../../shared/interfaces/videoItem.interface";
import { YoutubeSearchResult } from "../../shared/interfaces/youtubeSearchResult.interface";

const BASE_VIDEO_URL = "/videos";
const BASE_SEARCH_URL = "/search";
const VIDEO_PART = "snippet,statistics";
const SEARCH_TYPE = "video";
const MAX_RESULTS = 30;
const SEARCH_DELAY = 300;
const ITEM_PART = "snippet,contentDetails,statistics";

@Injectable({
    providedIn: "root",
})
export class GetInformationService {
    constructor(private http: HttpClient) {}

    private fetchVideoStatistics(videoIds: string[]): Observable<VideoItem[]> {
        const url = `${BASE_VIDEO_URL}?part=${VIDEO_PART}&id=${videoIds.join(",")}`;
        return this.http
            .get<{ items: VideoItem[] }>(url)
            .pipe(map((response) => response.items));
    }

    fetchSearchItems(query: string): Observable<VideoItem[]> {
        const url: string = `${BASE_SEARCH_URL}?type=${SEARCH_TYPE}&maxResults=${MAX_RESULTS}&q=${query}`;

        return this.http.get<{ items: YoutubeSearchResult[] }>(url).pipe(
            map((response) => response.items.map((item) => item.id.videoId)),
            switchMap((videoIds) => this.fetchVideoStatistics(videoIds)),
        );
    }

    searchItemById(id: string): Observable<VideoItem | undefined> {
        const url: string = `${BASE_VIDEO_URL}?type=${SEARCH_TYPE}&part=${ITEM_PART}&id=${id}`;
        return this.http.get<{ items: VideoItem[] }>(url).pipe(
            delay(SEARCH_DELAY),
            map((response) => response.items.find((item) => item.id === id)),
        );
    }

    fetchVideosByIds(ids: string[]): Observable<VideoItem[]> {
        const url = `${BASE_VIDEO_URL}?part=${VIDEO_PART}&id=${ids.join(",")}`;
        return this.http
            .get<{ items: VideoItem[] }>(url)
            .pipe(map((response) => response.items));
    }
}
