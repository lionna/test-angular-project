import {
    Component, EventEmitter, Input, Output
} from "@angular/core";

@Component({
    selector: "app-likes-count",
    standalone: true,
    imports: [],
    templateUrl: "./likes-count.component.html",
    styleUrl: "./likes-count.component.scss"
})
export class LikesCountComponent {
    @Input() count!: string;
    @Input() isLiked!: boolean;
    @Output() likeChange = new EventEmitter<void>();

    onLikeClick() {
        this.likeChange.emit();
    }
}
