import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { CustomButtonComponent } from "./custom-button/custom-button.component";

@Component({
    selector: "app-pagination",
    standalone: true,
    imports: [CustomButtonComponent],
    templateUrl: "./pagination.component.html",
    styleUrl: "./pagination.component.scss",
})
export class PaginationComponent implements OnInit {
    @Input() currentPage!: BehaviorSubject<number>;
    @Input() totalPages: number = 1;
    currentPageValue: number = 1;

    ngOnInit(): void {
        this.currentPage.subscribe((page) => {
            this.currentPageValue = page;
        });
    }

    goToPreviousPage() {
        if (this.currentPageValue > 1) {
            this.currentPage.next(this.currentPageValue - 1);
        }
    }

    goToNextPage() {
        if (this.currentPageValue < this.totalPages) {
            this.currentPage.next(this.currentPageValue + 1);
        }
    }
}
