import { log, customLog } from 'common/resources/scripts/log';

export class ArraySanitizerValueConverter {
    toView(value, transform = "") {
        if (!value || value == "[]" || value.Message == "An error has occurred.") {
            //customLog("ArraySanitizer: Bound array is empty");
            return [];
        }
        else {
            switch(transform) {
                case "reverse":
                    return value.reverse();
                case "sort":
                    return value.sort();
                case "reverse.ID":
                    return value.sort(function(a,b){ return b.ID - a.ID; });
                case "reverse.DateCreated":
                    return value.sort(function(a,b){ return new Date(b.DateCreated) - new Date(a.DateCreated) });
                default:
                    return value;
            }
        }
    }
}