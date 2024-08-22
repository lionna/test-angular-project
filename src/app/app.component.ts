import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "./components/header/header.component";
import { SearchComponent } from "./components/search/search.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        HeaderComponent,
        SearchComponent
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    title = "angular-test-project";
}
