import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DislikesCountComponent } from "./dislikes-count.component";

describe("DislikesCountComponent", () => {
    let component: DislikesCountComponent;
    let fixture: ComponentFixture<DislikesCountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DislikesCountComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DislikesCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
