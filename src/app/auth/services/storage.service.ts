import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class BrowserStorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    get(key: string): string | null {
        if (this.isBrowser()) {
            return localStorage.getItem(key);
        }
        return null;
    }

    set(key: string, value: string): void {
        if (this.isBrowser()) {
            localStorage.setItem(key, value);
        }
    }

    delete(key: string): void {
        if (this.isBrowser()) {
            localStorage.removeItem(key);
        }
    }
}
