import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';

@inject(DialogController)
export class Loading {
    constructor(dialogController) {
        this.dialogController = dialogController;
        this.dialogController.settings.lock = true;
        this.message = "";
        //this.dialogController.settings.centerHorizontalOnly = true;
    }
    activate(data) {
        this.message = data;
    }

    test() {
        customLog('tests');
    }

    save() {
        this.dialogController.ok();
    }
    cancel() {
        this.dialogController.cancel();
    }
}