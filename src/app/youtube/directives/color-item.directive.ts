import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
} from "@angular/core";

import { ColorService } from "../services/color.service";

@Directive({
    selector: "[appColorItem]",
    standalone: true,
})
export class ColorItemDirective implements OnChanges {
    @Input("appColorItem") publicationDate!: string;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private colorService: ColorService,
    ) {}

    ngOnChanges(): void {
        this.setBorderColor();
    }

    private setBorderColor(): void {
        const selectedColorClass = this.colorService.getColorClass(
            this.publicationDate,
        );
        this.renderer.addClass(this.el.nativeElement, selectedColorClass);
    }
}
