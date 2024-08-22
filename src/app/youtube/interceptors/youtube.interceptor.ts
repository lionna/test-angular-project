import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

export const youtubeInterceptorFn: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const apiKey = environment.YOUTUBE_API_KEY();
    const baseUrl = environment.baseUrl();

    const clonedRequest = req.clone({
        url: `${baseUrl}${req.url}`,
        setParams: {
            key: apiKey,
        },
    });

    return next(clonedRequest);
};
