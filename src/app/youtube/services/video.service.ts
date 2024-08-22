import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from "uuid";

import { CustomVideoItem } from "../../shared/interfaces/customVideoItem.interface";

@Injectable({
    providedIn: "root",
})
export class VideoService {
    createCustomVideo(
        title: string,
        description: string,
        img: string,
        link: string,
        creationDate: string,
        tags: string[],
    ): CustomVideoItem {
        return {
            link,
            id: uuidv4(),
            kind: "custom",
            etag: "",
            snippet: {
                publishedAt: creationDate,
                channelId: "",
                title,
                description,
                thumbnails: {
                    default: {
                        url: img,
                        height: 90,
                        width: 120,
                    },
                    medium: {
                        url: img,
                        height: 180,
                        width: 320,
                    },
                    high: {
                        url: img,
                        height: 360,
                        width: 480,
                    },
                    standard: {
                        url: img,
                        height: 360,
                        width: 480,
                    },
                    maxres: {
                        url: img,
                        height: 360,
                        width: 480,
                    },
                },
                channelTitle: "Custom",
                tags,
                categoryId: "0",
                liveBroadcastContent: "none",
                localized: {
                    title,
                    description,
                },
                defaultAudioLanguage: "en-IN",
                defaultLanguage: "en",
            },
            statistics: {
                viewCount: "0",
                likeCount: "0",
                dislikeCount: "0",
                commentCount: "0",
                favoriteCount: "0",
                isDisliked: false,
                isLiked: false,
            },
        };
    }
}
