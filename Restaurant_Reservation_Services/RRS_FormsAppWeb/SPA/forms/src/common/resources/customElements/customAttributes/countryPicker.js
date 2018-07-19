import { inject, customAttribute, bindable } from 'aurelia-framework';
import {datepicker} from 'common/plugins/bootstrap-datetimepicker.min';
import { Environment } from "common/resources/config/environment";
import { WebServices } from "common/services/webServices";

@customAttribute('countrypicker')
@inject(Element, Environment, WebServices)
export class CountryPicker {

    @bindable spColumn;

    constructor(element, environment, webServices) {
        this.$element = $(element);
        this.environment = environment;
        this.webServices = webServices;
    }

    attached() {
        let _self = this;

        this.$element.autocomplete({
            source: function (request, response) {

                _self.webServices.searchCountries(request.term, 1).then(apiResponse => {
                    response($.map(apiResponse, function (item) {
                        return {
                            key: item.Code,
                            label: item.Name
                        };
                    }));
                }).catch(err => {
                    customLog('error', err, "error");
                    if (err instanceof Response) { }
                    else if (err instanceof Error) { }
                    else { }
                });
            },
            //response: function (event, ui) {
            //    if (ui.content == '') {
            //        ui.content.push({ value: "No country", label: "No country", key: "NA" });
            //    }
            //},
            /*
            select: function (event, ui) {

                var label = ui.item.label;
                var key = ui.item.key;
                _self.spColumn = label;
            },
            */
            change: function (event, ui){
                _self.spColumn = $(this).val()
            },
            autoFocus: true,
            minLength: 2
        });
        //    .focus(function () {
        //    $(this).autocomplete('search', $(this).val())
        //});
    }
}