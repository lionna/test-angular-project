// eslint-disable-next-line max-classes-per-file
import { v4 as uuidv4 } from "uuid";

import { CustomVideoItem } from "../interfaces/customVideoItem.interface";
import { Thumbnail } from "../interfaces/thumbnail.interface";
import { VideoItem } from "../interfaces/videoItem.interface";

abstract class BaseVideoItemBuilder<T extends VideoItem> {
    protected videoItem: T;

    constructor(defaultValues: Partial<T>) {
        this.videoItem = {
            link: "http://default-link.com/video",
            id: uuidv4(),
            kind: "custom",
            etag: "",
            snippet: {
                publishedAt: new Date().toISOString(),
                channelId: "",
                title: "Default Title",
                description: "Default Description",
                channelTitle: "Custom",
                tags: [],
                categoryId: "0",
                liveBroadcastContent: "none",
                localized: {
                    title: "Default Title",
                    description: "Default Description",
                },
                defaultAudioLanguage: "en-IN",
                defaultLanguage: "en",
                thumbnails: {
                    default: this.createThumbnail(
                        "http://default-link.com/default.jpg",
                        90,
                        120,
                    ),
                    high: this.createThumbnail(
                        "http://default-link.com/high.jpg",
                        360,
                        480,
                    ),
                    maxres: this.createThumbnail(
                        "http://default-link.com/medium.jpg",
                        180,
                        320,
                    ),
                    medium: this.createThumbnail(
                        "http://default-link.com/medium.jpg",
                        180,
                        320,
                    ),
                    standard: this.createThumbnail(
                        "http://default-link.com/medium.jpg",
                        180,
                        320,
                    ),
                },
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
            ...defaultValues,
        } as unknown as T;
    }

    private createThumbnail(
        url: string,
        height: number,
        width: number,
    ): Thumbnail {
        return { url, height, width };
    }

    withId(id: string) {
        this.videoItem.id = id;
        return this;
    }

    withTitle(title: string) {
        this.videoItem.snippet.title = title;
        this.videoItem.snippet.localized.title = title;
        return this;
    }

    withDescription(description: string) {
        this.videoItem.snippet.description = description;
        this.videoItem.snippet.localized.description = description;
        return this;
    }

    withCreationDate(date: string) {
        this.videoItem.snippet.publishedAt = date;
        return this;
    }

    withTags(tags: string[]) {
        this.videoItem.snippet.tags = tags;
        return this;
    }

    withThumbnails(thumbnails: { [key: string]: Thumbnail }) {
        this.videoItem.snippet.thumbnails = {
            ...this.videoItem.snippet.thumbnails,
            ...thumbnails,
        };
        return this;
    }

    withStatistics(statistics: Partial<VideoItem["statistics"]>) {
        this.videoItem.statistics = {
            ...this.videoItem.statistics,
            ...statistics,
        };
        return this;
    }

    abstract build(): T;
}

export class VideoItemBuilder extends BaseVideoItemBuilder<VideoItem> {
    constructor() {
        super({});
    }

    build(): VideoItem {
        return this.videoItem;
    }
}

export class CustomVideoItemBuilder extends BaseVideoItemBuilder<CustomVideoItem> {
    constructor() {
        super({
            link: "http://default-link.com/video",
        });
    }

    withLink(link: string) {
        this.videoItem.link = link;
        return this;
    }

    build(): CustomVideoItem {
        return this.videoItem;
    }
}
