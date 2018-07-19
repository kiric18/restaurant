import { inject, bindable } from "aurelia-framework";
import { closeTab } from 'common/resources/scripts/helper';
import $ from 'jquery';

@inject()
export class Password {
    @bindable elementId;
    @bindable elementName;
    @bindable iconId;
    @bindable label;
    @bindable column;
    @bindable placeholder;
    @bindable isDisabled;

    constructor() {

    }

    showPassword() {

        var passText = document.getElementById(this.elementId); //$('#' + elementId);
        var icon = $('#' + this.iconId); //document.getElementById(iconElementId);
        if (icon.hasClass("fa-eye-slash")) {
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
            passText.type = 'text';
        }
        else if (icon.hasClass("fa-eye")) {
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
            passText.type = 'password';
        }
    }
}