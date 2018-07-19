import { log, customLog } from 'common/resources/scripts/log';

export class ViewDebuggerValueConverter {
    toView(value) {
        customLog("ViewDebuggerValueConverter ", value);

        return value;
    }
}