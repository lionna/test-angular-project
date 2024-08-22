import {
    Directive, ElementRef, Input, OnChanges
} from "@angular/core";

import { ColorService } from "../services/color.service";

@Directive({
    selector: "[appBorderItem]",
    standalone: true
})
export class BorderItemDirective implements OnChanges {
    @Input("appBorderItem") publicationDate!: string;

    constructor(private el: ElementRef, private borderColorService: ColorService) {}

    ngOnChanges(): void {
        this.setBorderColor();
    }

    private setBorderColor(): void {
        const selectedColor = this.borderColorService.getColor(this.publicationDate);
        this.el.nativeElement.style.borderBottomColor = selectedColor;
    }
}
