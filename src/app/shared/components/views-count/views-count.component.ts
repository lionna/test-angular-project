import { Component, Input } from "@angular/core";

@Component({
    selector: "app-views-count",
    standalone: true,
    imports: [],
    templateUrl: "./views-count.component.html",
    styleUrl: "./views-count.component.scss",
})
export class ViewsCountComponent {
    @Input() count!: string;
}
