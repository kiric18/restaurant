import { bindable } from "aurelia-framework";

export class Comments {
    @bindable commentElement;
    @bindable isReadonly;
    @bindable elementName;
    @bindable rowsCount;

    constructor() {
        this.rowsCount = 4;
        this.info = '';
        this.isReadonly = false;
    }
}