import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab, datetimepicker, formatDateToSharepoint, setMinTime, setMinDate, setMaxDate, currentDate, currentTime } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import 'selectize';

@inject(Element, Router, AppController)
export class SearchRestaurant {

    constructor(element, router, appController) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {
        let _self = this;

        this.select = this.$element.find("#search").selectize({
            plugins: ['remove_button'],
            delimiter: ',',
            persist: false,
            valueField: 'Id',
            labelField: 'Description',
            searchField: ['Name', 'Description'],
            sortField: 'Name',
            //options: _self.optionsList,
            create: false,
            onItemAdd: function (value, $item) {
                var data = this.options[value];
                if (data) {
                    var newObject = { Id: data.Id, OptGroup: data.optgroup }
                    _self.appController.RestaurantSearch.Search.push(newObject);
                }
            },
            onItemRemove: function (value, $item) {
                var data = this.options[value];
                for (var i = 0; i < _self.appController.RestaurantSearch.Search.length; i++) {
                    if (data && data.Id) {
                        _self.appController.RestaurantSearch.Search.splice(i, 1);

                    }
                }
            },
        });
    }

    dtDateChanged(valueIn) {
        var newDate = formatDateToSharepoint(valueIn);
        if (newDate && newDate != "Invalid date") {
            this.appController.RestaurantSearch.Date = newDate;
        }
    }

    search() {
        let _self = this;
        customLog(`Restaurant Search: `, this.appController.RestaurantSearch, "info");
        this.appController.webServices.searchRestaurant(this.appController.RestaurantSearch, "User").then(response => {
            customLog(`Restaurant Search Response: `, response.Restaurants, "info");
            if (_self.appController.RestaurantSearch.RestaurantName && response.Restaurants && response.Restaurants[0]) {
                _self.appController.RestaurantsResultsList = response.Restaurants;
                _self.appController.SelectedRestaurant = _self.appController.json.clone(response.Restaurants[0]);
                _self.router.navigateToRoute("SelectedRestaurant");
            }
            else {
                _self.appController.RestaurantsResultsList = response.Restaurants;
                _self.router.navigateToRoute("RestaurantsResults");
            }
        });
    }
}