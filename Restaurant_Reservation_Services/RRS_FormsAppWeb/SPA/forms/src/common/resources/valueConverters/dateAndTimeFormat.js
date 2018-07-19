import moment from 'moment';
import { log, customLog } from 'common/resources/scripts/log';

export class DateAndTimeFormatValueConverter {

    toView(value) {
        let dateFormat = 'DD/MM/YYYY HH:mm';
        let result = moment(value).format(dateFormat);
        return result;
    }
    //fromView(value) {
    //    let result = moment(value, 'YYYY-MM-DD');
    //    return result;
    //}
}