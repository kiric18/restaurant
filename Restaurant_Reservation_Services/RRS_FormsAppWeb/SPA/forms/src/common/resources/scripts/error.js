import { inject } from 'aurelia-framework';
import { Popup } from 'common/resources/scripts/popup';
import { closeTab } from 'common/resources/scripts/helper';
import { ServerLog } from "common/services/serverLog";

@inject(Popup, ServerLog)
export class Error {
    constructor(popup, serverLog) {
        this.popup = popup;
        this.serverLog = serverLog;
    }

    addError(message, isBlocking = false, functionName, viewModelName, metadata) {

        // Always log
        //this.serverLog.addLogError(message, functionName, viewModelName, metadata);

        if (isBlocking === true) {
            this.popup.popupCritical(message, 'Critical Error').then(response => {
                closeTab();
            });
        }
        else {
            this.popup.popupError(message, 'Error');
        }
    }
}