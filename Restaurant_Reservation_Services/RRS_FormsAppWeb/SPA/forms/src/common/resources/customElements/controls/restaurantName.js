import { inject, bindable } from "aurelia-framework";
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import $ from 'jquery';

@inject(Element, AppController)
export class RestaurantName {
    @bindable elementId;
    @bindable elementName;
    @bindable isDisabled;

    constructor(element, appController) {
        this.$element = $(element);
        this.appController = appController;
        this.isDisabled = false;
    }
    attached() {
        let _self = this;
        this.$element.find("#RestaurantName").autocomplete({
            source: function (request, response) {
                _self.appController.webServices.search(request.term).then(apiResponse => {
                    response($.map(apiResponse, function (item) {
                        return {
                            label: item.RestaurantName,
                            key: item.Id
                        };
                    }));
                }).catch(err => {
                    log.debug('error', err);
                    if (err instanceof Response) { }
                    else if (err instanceof Error) { }
                    else { }
                });
            },
            response: function (event, ui) {

            },
            select: function (event, ui) {
                _self.appController.RestaurantSearch.RestaurantName = ui.item ? ui.item.label : "";
                _self.appController.RestaurantSearch.RestaurantId = ui.item ? ui.item.key : "";
            },
            change: function (event, ui) {
                $(this).val((ui.item ? ui.item.label : ""));
                _self.appController.RestaurantSearch.RestaurantName = ui.item ? ui.item.label : "";
                _self.appController.RestaurantSearch.RestaurantId = ui.item ? ui.item.key : "";
            },
            autoFocus: true,
            minLength: 4
        });
    }
}