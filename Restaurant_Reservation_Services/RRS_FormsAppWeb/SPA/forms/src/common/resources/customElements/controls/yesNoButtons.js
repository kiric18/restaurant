import { inject, bindable } from 'aurelia-framework';
import $ from 'bootstrap';
import { Environment } from 'common/resources/config/environment';
import { log, customLog } from 'common/resources/scripts/log';

@inject(Element)
export class YesNoButtons {

    @bindable spColumn;
    @bindable enabledValidator;
    @bindable updateFields;

    constructor(element) {
        this.$element = $(element);
    }

    buttonChanged(value) {
        let _self = this;
        this.spColumn = value;
        if (this.spColumn == 'Yes') {
            if (_self.enabledValidator) {
                setTimeout(_ => { _self.enabledValidator() },0);
            }
        }
        if (_self.updateFields) {
            setTimeout(_ => { _self.updateFields() },0);
        }
    }
}