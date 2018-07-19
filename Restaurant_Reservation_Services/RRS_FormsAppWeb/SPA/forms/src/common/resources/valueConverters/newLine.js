import { log, customLog } from 'common/resources/scripts/log';

export class NewLineValueConverter {
    toView(value) {
        if (value) {
            //return value.replace("\n", );
            return value.replace(new RegExp("\n", 'g'), "<br>");
        }

        return value;
    }
}