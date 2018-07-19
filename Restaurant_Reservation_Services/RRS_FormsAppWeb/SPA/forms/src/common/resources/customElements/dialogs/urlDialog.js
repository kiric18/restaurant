import { DialogController } from 'aurelia-dialog';
import { inject } from "aurelia-framework";

@inject(DialogController)
export class UrlDialog {

    constructor(dialogController) {
        this.dialogController = dialogController;
        this.title = "";
        this.url = "";
    }

    activate(data) {
        this.title = data.title;
        this.url = data.url;
    }
}