import { DialogController } from 'aurelia-dialog';
import { inject } from "aurelia-framework";

@inject(DialogController, Element)
export class ImageDialog {
    constructor(dialogController, element) {
        this.dialogController = dialogController;
        this.title = "";
        this.body = "";
        this.ImageName = "";
        this.ImageExtension = "";
        this.ImageBase64 = "";

        //signs
        this.$element = $(element);
    }
    activate(data) {
        this.title = data.title;
        this.body = data.body;
        this.ImageName = data.ImageName;
        this.ImageExtension = data.ImageExtension;
        this.ImageBase64 = data.ImageBase64;
    }

    attached() {
        let _self = this;

        this.$element.keyup(function (e) {
            if (e.keyCode === 27) {
                _self.dialogController.cancel();
            }// esc
        });
    }
}