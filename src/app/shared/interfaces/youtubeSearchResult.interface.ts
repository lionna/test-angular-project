export interface YoutubeSearchResult {
    kind: string;
    etag: string;
    id: Id;
}

interface Id {
    kind: string;
    videoId: string;
}
