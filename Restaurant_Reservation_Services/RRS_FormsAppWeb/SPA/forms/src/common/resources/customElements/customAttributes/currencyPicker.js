import { inject, customAttribute, bindable } from 'aurelia-framework';
import { Environment } from "common/resources/config/environment";
import { WebServices } from "common/services/webServices";

@customAttribute('currencypicker')
@inject(Element, Environment, WebServices)
export class CurrencyPicker {

    @bindable spColumn;
    @bindable currencyChanged;

    constructor(element, environment, webServices) {
        this.$element = $(element);
        this.environment = environment;
        this.webServices = webServices;
    }

    attached() {
        console.log("Currency picker attaching...");
        let _self = this;

        this.$element.autocomplete({
            source: function (request, response) {

                _self.webServices.searchCurrencies(request.term, 1).then(apiResponse => {
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
            response: function (event, ui) {
                if (ui.content == '') {
                    ui.content.push({ value: "No currency", label: "No currency", key: "NA" });
                }
            },
            /*
                    select: function (event, ui) {

                var label = ui.item.label;
                var key = ui.item.key;
                _self.spColumn = label;
            },
            */
            change: function (event, ui){
                $(this).val((ui.item ? ui.item.label : ""));
                _self.spColumn = ui.item ? ui.item.label : "";
                if (_self.currencyChanged){
                    setTimeout(_ => { _self.currencyChanged() },0);
                }
            },
            autoFocus: true,
            minLength: 0
        }).focus(function () {
            $(this).autocomplete('search', $(this).val())
        });
    }
    detached() {
        console.log("Currency picker detaching...");
        this.$element.autocomplete('destroy');
    }
}