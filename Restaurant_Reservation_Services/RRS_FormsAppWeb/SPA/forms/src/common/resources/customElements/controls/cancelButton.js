import { inject, bindable } from "aurelia-framework";
import { DialogService } from 'aurelia-dialog';
import { closeTab } from 'common/resources/scripts/helper';
import { Popup } from 'common/resources/scripts/popup';

@inject(DialogService, Popup)
export class CancelButton {
    @bindable isDisabled;
    constructor(dialogService, popup) {
        this.dialogService = dialogService;
        this.popup = popup;
    }
    cancel() {
        let confirmMessage = "Are you sure you want to cancel? All unsaved progress will be lost.";
        this.popup.popupQuestion(confirmMessage).then(result => {
            if (result.wasCancelled) {

            }
            else {
                closeTab();
            }
        });
    }
}