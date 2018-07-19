import moment from 'moment';
import { log, customLog } from 'common/resources/scripts/log';

export class DateFormatValueConverter {

    toView(value) {
        let dateFormat = 'DD/MM/YYYY';
        let result = (value) ? moment(value).format(dateFormat) : "";
        return result;
    }

    fromView(value) {
        let dateFormat = 'DD/MM/YYYY';
        let sharePointdateFormat = 'YYYY-MM-DD';
        let result = (value) ? moment(value, dateFormat).format(sharePointdateFormat) : "";
        return result;
    }
}