import { inject, customAttribute } from 'aurelia-framework';
import {datepicker} from 'common/plugins/bootstrap-datetimepicker.min';
import { Environment } from "common/resources/config/environment";

@customAttribute('timepicker')
@inject(Element, Environment)
export class TimePicker {
    constructor(element, environment) {
        this.$element = $(element);
        this.environment = environment;
        this.timeFormat = 'HH:mm';
    }

    attached() {
        let _self = this;
        // New
        this.$element.datetimepicker({
            format: this.timeFormat,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'auto'
            },
            stepping: 15,
            ignoreReadonly: true,
            useCurrent: false
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