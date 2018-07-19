import { DialogController } from 'aurelia-dialog';
import { inject } from "aurelia-framework";

@inject(DialogController)
export class Confirm {
    constructor(dialogController) {
        this.dialogController = dialogController;
        this.message = "";
    }
    activate(data) {
        this.message = data;
    }
}