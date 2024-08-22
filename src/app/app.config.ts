import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import { FavoriteEffects } from "./redux/effects/favorite.effects";
import { VideosEffects } from "./redux/effects/videos.effects";
import { customCardsReducer } from "./redux/reducers/custom-cards.reducer";
import { favoriteReducer } from "./redux/reducers/favorite.reducer";
import { videosReducer } from "./redux/reducers/videos.reducer";
import { youtubeInterceptorFn } from "./youtube/interceptors/youtube.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(withInterceptors([youtubeInterceptorFn])),
        provideStore({
            favorites: favoriteReducer,
            customCards: customCardsReducer,
            videos: videosReducer,
        }),
        provideEffects([FavoriteEffects, VideosEffects]),
        provideStoreDevtools({
            maxAge: 25,
            autoPause: true,
            trace: false,
            traceLimit: 75,
        }),
    ],
};
