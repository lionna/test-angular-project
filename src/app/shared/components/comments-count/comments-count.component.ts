import { Component, Input } from "@angular/core";

@Component({
    selector: "app-comments-count",
    standalone: true,
    imports: [],
    templateUrl: "./comments-count.component.html",
    styleUrl: "./comments-count.component.scss"
})
export class CommentsCountComponent {
    @Input() count!: string;
}
