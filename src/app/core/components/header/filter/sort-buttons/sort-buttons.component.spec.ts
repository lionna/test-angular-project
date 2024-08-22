import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SortingBy } from "../../../../enums/sorting-by.enum";
import { SortingOrder } from "../../../../enums/sorting-order.enum";
import { SortButtonsComponent } from "./sort-buttons.component";

describe("SortButtonsComponent", () => {
    let component: SortButtonsComponent;
    let fixture: ComponentFixture<SortButtonsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SortButtonsComponent, CommonModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SortButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize with default values", () => {
        expect(component.sortBy).toBe(SortingBy.Date);
        expect(component.sortOrder).toBe(SortingOrder.Asc);
    });

    it("should emit sortChange event with correct values when a sort option is clicked", () => {
        jest.spyOn(component.sortChange, "emit");

        const sortOption = SortingBy.Date;
        const sortLink = fixture.debugElement.query(By.css(".text-color-blue"));

        sortLink.nativeElement.click();
        fixture.detectChanges();

        expect(component.sortChange.emit).toHaveBeenCalledWith({
            sortBy: sortOption,
            sortOrder: SortingOrder.Desc,
        });
    });

    it("should toggle sort order when the same sort option is clicked", () => {
        jest.spyOn(component.sortChange, "emit");

        component.onSortChange(SortingBy.Date);
        fixture.detectChanges();

        component.onSortChange(SortingBy.Date);
        fixture.detectChanges();

        expect(component.sortChange.emit).toHaveBeenCalledWith({
            sortBy: SortingBy.Date,
            sortOrder: SortingOrder.Desc,
        });
    });

    it("should set sortOrder to Asc when selecting a new sort option", () => {
        jest.spyOn(component.sortChange, "emit");

        component.onSortChange(SortingBy.Views);
        fixture.detectChanges();

        expect(component.sortBy).toBe(SortingBy.Views);
        expect(component.sortOrder).toBe(SortingOrder.Asc);
        expect(component.sortChange.emit).toHaveBeenCalledWith({
            sortBy: SortingBy.Views,
            sortOrder: SortingOrder.Asc,
        });
    });
});
