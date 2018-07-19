import { log, customLog } from 'common/resources/scripts/log';

export class CheckboxToChoiceValueConverter {

    toView(value) {
        if (!value || value == 'No' || value == 'False') {
            return false;
        }
        else {
            return true;
        }
    }

    fromView(value) {
        if (value == true) {
            return 'Yes';
        }
        else {
            return 'No';
        }
    }
}