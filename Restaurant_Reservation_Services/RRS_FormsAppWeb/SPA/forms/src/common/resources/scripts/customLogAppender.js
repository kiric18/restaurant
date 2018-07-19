import {inject} from 'aurelia-framework';
import { Popup } from 'common/resources/scripts/popup';
import { closeTab } from 'common/resources/scripts/helper';
import { ServerLog } from "common/services/serverLog";

@inject(Popup, ServerLog)
export class CustomLogAppender {
    constructor(popup, serverLog) {
        this.popup = popup;
        this.serverLog = serverLog;
    }

    debug(logger, message, ...rest){
        console.debug(`DEBUG [${logger.id}] ${message}`, ...rest);
    }
    info(logger, message, ...rest){
        console.info(`INFO [${logger.id}] ${message}`, ...rest);
    }
    warn(logger, message, ...rest){
        console.warn(`WARN [${logger.id}] ${message}`, ...rest);
    }
    error(logger, message,isBlocking=false, ...rest){
        console.error(`ERROR [${logger.id}] ${message}`, ...rest);

        //this.serverLog.addLogError(message, "" , logger.id, ...rest);

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
