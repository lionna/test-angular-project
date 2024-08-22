import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";

import { GetInformationService } from "../../youtube/services/get-information.service";
import {
    finishLoadingYouTubeVideos,
    loadYouTubeVideos,
    startLoadingYouTubeVideos,
} from "../actions/videos.actions";

@Injectable()
export class VideosEffects {
    constructor(
        private actions$: Actions,
        private searchService: GetInformationService,
    ) {}

    loadVideos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadYouTubeVideos),
            tap(() => startLoadingYouTubeVideos()),
            mergeMap(({ query }) =>
                this.searchService.fetchSearchItems(query).pipe(
                    map((videos) => finishLoadingYouTubeVideos({ videos })),
                    catchError(() =>
                        of(finishLoadingYouTubeVideos({ videos: [] })),
                    ),
                ),
            ),
        );
    });
}
