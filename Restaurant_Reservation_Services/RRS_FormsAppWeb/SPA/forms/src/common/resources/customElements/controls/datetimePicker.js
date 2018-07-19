//import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
//import moment from 'moment';
//import {datepicker} from 'common/plugins/bootstrap-datetimepicker.min';
//import $ from 'jquery';

//@inject(Element)
//export class DatePicker {

//    @bindable elementId;
//    @bindable format = "DD MMMM YYYY hh:mm:ss a";
//    @bindable({defaultBindingMode: bindingMode.twoWay}) datevalue;
//    constructor(element) {
//        this.element = element;
//    }

//    attached() {
//        this.datePicker = $(this.element).find('.input-group.date')
//            .datetimepicker({
//                format: this.format,
//                showClose: true,
//                showTodayButton: true
//            });

//        this.datePicker.on("dp.change", (e) => {
//            this.datevalue = moment(e.date).format(this.format);
//        });
//    }
//}


import {inject, bindable,} from 'aurelia-framework';
import { log, customLog } from 'common/resources/scripts/log';
import {datetimepicker} from 'common/resources/scripts/helper';

import $ from 'jquery';
import moment from 'moment';
import 'common/plugins/bootstrap-datetimepicker.min'

@inject(Element)
export class DatetimePicker{

    @bindable value;
    @bindable elementId;
    @bindable isTime;
    @bindable elementName;

    constructor(element){
        this.element = element;

        this.dtElement = $('#' + this.elementId).find();
        this.dateTimePicker = null;
        this.isTime = false;
        this.dateFormat = 'DD/MM/YYYY';
        this.timeFormat = 'HH:mm';

    }

    valueChanged(newValue, oldValue){
        if(this.dateTimePicker)
        {
            this.dateTimePicker.data("DateTimePicker").date(newValue);
            customLog('date changed ', newValue);
        }
    }

    bind(bindingContext, overrideContext){

    }

    attached(){
        //let elem = $(this.element).find(".input-group");
        //customLog('attached ', this.elem);
        this.dateTimePicker = datetimepicker(this.elementId, this.getFormat());

        this.dateTimePicker.on("dp.change", e => {
            this.value = new Date(e.date);
            customLog('date new change', e.date);
        });
    }

    getFormat(){
        let result = this.isTime ? this.timeFormat : this.dateFormat
        //customLog(result);

        return result;
    }
}
