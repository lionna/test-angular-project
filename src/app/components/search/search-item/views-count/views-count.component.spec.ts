import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewsCountComponent } from "./views-count.component";

describe("ViewsCountComponent", () => {
    let component: ViewsCountComponent;
    let fixture: ComponentFixture<ViewsCountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewsCountComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ViewsCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
