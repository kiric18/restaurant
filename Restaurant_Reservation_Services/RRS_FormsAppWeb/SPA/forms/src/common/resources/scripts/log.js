import { LogManager } from "aurelia-framework";
import moment from 'moment';

export var log = LogManager.getLogger('RRS-log');

// New 19/07/2018
export function customLog(msg, value = "", type = "debug") {
    let timestamp = moment().format("HH:mm:ss");

    switch (type) {
        case 'info':
            log.info(`[${timestamp}]`, msg, value);
            break;
        case 'error':
            log.error(`[${timestamp}]`, msg, value);
            break;
        default:
            log.debug(`[${timestamp}]`, msg, value);
            break;
    }
}

//** Usage **//
/**************
import { log, customLog } from 'common/resources/scripts/log';

log.debug("debug");
log.info("info");
log.error("errro");
********************///