import { TestBed } from "@angular/core/testing";

import { CustomVideoItemBuilder } from "../../shared/utils/videoItemBuilder";
import { VideoService } from "./video.service";

jest.mock("uuid", () => ({
    v4: jest.fn(() => "mock-uuid"),
}));

describe("VideoService", () => {
    let service: VideoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VideoService],
        });

        service = TestBed.inject(VideoService);
    });

    const title = "Sample Video";
    const description = "This is a sample video description.";
    const img = "http://example.com/image.jpg";
    const link = "http://example.com/video";
    const creationDate = "2024-08-01T00:00:00Z";
    const tags = ["sample", "video"];

    it("should correctly create a custom video item with all specified properties", () => {
        const result = service.createCustomVideo(
            title,
            description,
            img,
            link,
            creationDate,
            tags,
        );

        const expectedVideoItem = new CustomVideoItemBuilder()
            .withId("mock-uuid")
            .withTitle(title)
            .withDescription(description)
            .withLink(link)
            .withCreationDate(creationDate)
            .withTags(tags)
            .withThumbnails({
                default: { url: img, height: 90, width: 120 },
                medium: { url: img, height: 180, width: 320 },
                high: { url: img, height: 360, width: 480 },
                standard: { url: img, height: 360, width: 480 },
                maxres: { url: img, height: 360, width: 480 },
            })
            .withStatistics({
                viewCount: "0",
                likeCount: "0",
                dislikeCount: "0",
                commentCount: "0",
                favoriteCount: "0",
                isDisliked: false,
                isLiked: false,
            })
            .build();

        expect(result).toEqual(expectedVideoItem);
    });
});
