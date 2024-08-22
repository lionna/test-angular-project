import { PageInfo } from "./pageInfo.interface";
import { VideoItem } from "./videoItem.interface";

export interface YouTubeResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: VideoItem[];
}
