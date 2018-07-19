import { bindable, inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { trimEndSpaceComma } from 'common/resources/scripts/helper';
import $ from 'bootstrap';
import 'common/plugins/chosen.jquery.min';

@inject(Element)
export class ChosenControl {
    @bindable elementId;
    @bindable spColumn;
    @bindable optionsList;
    @bindable placeholder;
    @bindable isDisabled;
    @bindable isMulti;
    @bindable needToCallMethod;
    @bindable callMethod;

    constructor(element) {
        this.$element = $(element);
        this.optionsList = [];
        this.placeholder = '';
        this.isMulti = false;
        this.isDisabled = false;
        this.needToCallMethod = false;
        this.disabledSelectAll = false;
    }

    attached() {
        let _self = this;
        if (this.isMulti) {
            this.spColumn = !this.spColumn ? [] : this.spColumn;
            setTimeout(_ => {
                _self.setChosen();
            }, 1000);
        }
        else {
            this.spColumn = !this.spColumn ? '' : this.spColumn;
            this.setChosen();
        }
    }

    setChosen() {
        let _self = this;
        let element = this.$element.find("#" + this.elementId);
        element.chosen().change(function (evt, params) {
            if (params.deselected) {
                if (_self.isMulti && _self.spColumn.indexOf(params.deselected) > -1) {
                    for (var i = 0; i < _self.spColumn.length; i++) {
                        if (_self.spColumn[i] === params.deselected) {
                            _self.spColumn.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    _self.spColumn = '';
                }
            }
            else if (params.selected) {
                if (_self.isMulti) {
                    _self.spColumn.push(params.selected);
                }
                else {
                    _self.spColumn = params.selected;
                }
            }
        }).val(this.spColumn).trigger("chosen:updated");
    }
}