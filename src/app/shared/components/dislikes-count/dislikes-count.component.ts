import { Component, Input } from "@angular/core";

@Component({
    selector: "app-dislikes-count",
    standalone: true,
    imports: [],
    templateUrl: "./dislikes-count.component.html",
    styleUrl: "./dislikes-count.component.scss",
})
export class DislikesCountComponent {
    @Input() count!: string;
}
