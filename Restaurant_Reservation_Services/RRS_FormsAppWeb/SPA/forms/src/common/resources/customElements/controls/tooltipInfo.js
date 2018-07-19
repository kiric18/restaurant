import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery';
import { Environment } from 'common/resources/config/environment';
import { log, customLog } from 'common/resources/scripts/log';

@inject(Element)
export class TooltipInfo {

    @bindable elementId;
    @bindable info;

    constructor(element) {
        this.$element = $(element);
    }


    attached() {
        let _self = this;
        if (this.elementId){
            $("#" + this.elementId).tooltip();
        }
    }
}