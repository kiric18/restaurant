import { DialogController } from 'aurelia-dialog';
import { inject } from "aurelia-framework";

@inject(DialogController, Element)
export class PopupDialog {
    constructor(dialogController, element) {
        this.dialogController = dialogController;
        this.title = "";
        this.body = "";

        //buttons
        this.hasCancelButton = false;
        this.hasOkButton = false;
        this.hasNoButton = false;
        this.hasYesButton = false;

        //signs
        this.type = "";
        this.$element = $(element);
    }
    activate(data) {
        this.title = data.title;
        this.body = data.body;
        this.hasCancelButton = data.hasCancelButton;
        this.hasOkButton = data.hasOkButton;
        this.hasNoButton = data.hasNoButton;
        this.hasYesButton = data.hasYesButton;
        this.type = data.type;
    }

    attached() {
        let _self = this;
        this.$element.find("#yesbtn").focus();
        this.$element.find("#okbtn").focus();

        this.$element.keyup(function(e) {
            if (e.keyCode === 27){
                _self.dialogController.cancel();
            }// esc
        });
    }
}