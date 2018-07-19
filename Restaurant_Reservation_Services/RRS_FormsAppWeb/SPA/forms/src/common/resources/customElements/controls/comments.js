import { bindable } from "aurelia-framework";

export class Comments {
    @bindable panelTitle;
    @bindable commentElement;
    @bindable isReadonly;
    @bindable elementName;
    @bindable rowsCount;
    @bindable info;
    @bindable tooltipId;

    constructor() {
        this.rowsCount = 4;
        this.info = '';
        this.isReadonly = false;
    }
}