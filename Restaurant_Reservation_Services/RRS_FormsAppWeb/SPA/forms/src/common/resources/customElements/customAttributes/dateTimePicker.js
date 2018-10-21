import { inject, customAttribute } from 'aurelia-framework';
import {datepicker} from 'common/plugins/bootstrap-datetimepicker.min';
import { Environment } from "common/resources/config/environment";

@customAttribute('datetimepicker')
@inject(Element, Environment)
export class DateTimePicker {
    constructor(element, environment) {
        this.$element = $(element);
        this.environment = environment;
        this.dateTimeFormat = 'DD/MM/YYYY HH:mm';
    }

    attached() {
        let _self = this;
        // New
        this.$element.datetimepicker({
            format: this.dateTimeFormat,
            showTodayButton: true,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: this.getWidgetVerticalPosition()
            },
            stepping: 30,
            ignoreReadonly: true,
            useCurrent: false,
            //sideBySide: true,
        }).on('dp.change', (e) => { fireEvent(e.target, 'input'); });

        this.$element.next().click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            _self.$element.data("DateTimePicker").show();
        });
    }

    detached() {
        this.$element.data("DateTimePicker").destroy();
    }

    //Get widget vertical position
    getWidgetVerticalPosition() {
        let verticalPositioning = 'auto';
        let datePickerOffset = $('.input-group.date').offset();
        let datePickerHeight = $('.input-group.date').height();
        let datePickerBottom = datePickerOffset.top + datePickerHeight + 120;
        let greyOffset = $('.gray-hsd-bg').offset();
        let greyHeight = $('.gray-hsd-bg').height();
        let greyBottom = greyOffset.top + greyHeight;

        if (datePickerBottom > greyBottom) {
            verticalPositioning = 'top';
        }
        return verticalPositioning;
    }
}

function createEvent(name) {
    var event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
}

function fireEvent(element, name) {
    var event = createEvent(name);
    element.dispatchEvent(event);
}