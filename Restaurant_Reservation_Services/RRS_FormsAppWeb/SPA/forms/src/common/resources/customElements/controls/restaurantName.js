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
                response($.map(_self.appController.RestaurantNamesList, function (value, key) {
                    return {
                        label: value.RestaurantName,
                        key: value.Id
                    }
                }));
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