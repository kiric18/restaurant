import { log, customLog } from 'common/resources/scripts/log';

export class HtmlSanitizerValueConverter {
    toView(value) {
        let result = value;

        if (value && (typeof value === 'string' || value instanceof String) && value.indexOf("&amp;") > -1) {
            result = value.replace("&amp;", "&");

            customLog(`HtmlSanitizerValueConverter: value "${value}" converted to "${result}"`);
        }

        return result;
    }
}