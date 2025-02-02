import { ActiveColorSide } from "./ColorInterpolation";

export class ColorPickerSetInterpolationActiveEvent extends Event {
    static eventName = "set-interpolation-active";
    active: ActiveColorSide;
    
    constructor(active: ActiveColorSide) {
        super(ColorPickerSetInterpolationActiveEvent.eventName, { bubbles: true, composed: true });
        this.active = active;
    }
}