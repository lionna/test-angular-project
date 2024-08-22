import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordFilterInputComponent } from "./word-filter-input.component";

describe("WordFilterInputComponent", () => {
    let component: WordFilterInputComponent;
    let fixture: ComponentFixture<WordFilterInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordFilterInputComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WordFilterInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
