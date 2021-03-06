﻿import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { formatDateToSharepoint} from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import $ from 'jquery';
import selectize from 'selectize';

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
            valueField: 'Name',
            labelField: 'Name',
            searchField: ['Name', 'City', 'RestautantName', 'CuisineId', 'AmenitieId', 'StyleId'],
            sortField: 'Name',
            options: [],
            optgroups: [],
            //optgroupValueField: 'value',
            optgroupField: 'OptGroup',
            create: false,
            onItemAdd: function (value, $item) {
                var data = this.options[value];
                if (data) {
                    var newObject = { Id: data.Name, OptGroup: data.OptGroup };
                    _self.appController.RestaurantSearch.Search.push(newObject);
                    if (data.OptGroup == 'Restaurants') {
                        _self.appController.RestaurantSearch.RestaurantName = data.Name;
                        _self.appController.RestaurantSearch.RestaurantId= data.Id;
                    }
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
            render: {
                optgroup_header: function (data, escape) {
                    var location = '<div class="optgroup-header"><i class="fa fa-map-marker" aria-hidden="true"></i><span>  ' + escape(data.title) + '</span></div>';
                    var restaurant = '<div class="optgroup-header"><i class="fa fa-building-o" aria-hidden="true"></i><span>  ' + escape(data.title) + '</span></div>';
                    var cuisine = '<div class="optgroup-header"><i class="fa fa-cutlery" aria-hidden="true"></i><span>  ' + escape(data.title) + '</span></div>';
                    var defaultView = '<div class="optgroup-header"><span>' + escape(data.title) + '</span></div>';

                    if (data.title == 'Locations') {
                        return location;
                    }
                    else if (data.title == 'Restaurants') {
                        return restaurant;
                    }
                    else if (data.title == 'Cuisines') {
                        return cuisine;
                    }
                    return defaultView;
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                _self.appController.webServices.search(query).then(apiResponse => {
                    var selectize = _self.select[0].selectize; // Use myFooDropdown to get selectize instance
                    var items = [];

                    if (apiResponse && apiResponse.length > 0) {
                        apiResponse.forEach(item => {
                            var optgroup = {
                                id: item.OptGroup,
                                title: item.OptGroup
                            };
                            selectize.addOptionGroup(optgroup.id, optgroup);
                            item.OptGroup = optgroup.id;
                            items.push(item);
                        });
                    }
                    callback(items);
                }).catch(err => {
                    log.debug('error', err);
                    callback();
                });
            },
            //onDropdownClose: function () {
            //    this.clearOptions();
            //}
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
        this.appController.webServices.searchRestaurant(this.appController.RestaurantSearch).then(response => {
            customLog(`Restaurant Search Response: `, response.Restaurants, "info");
            if (_self.appController.RestaurantSearch.RestaurantName && response.Restaurants) {
                let name = response.Restaurants[0].RestaurantInternalName;
                let url = _self.appController.environment.appUrl + '/Spa/forms/assets/virtualTour/' + name.toLowerCase() + '/index.html';
                window.open(url, '_self');
                //_self.router.navigate(`#/user/selectedRes/${name.toLowerCase()}`);
            }
            else {
                _self.router.navigate(`#/user/RestaurantsResults/all`);
            }
        });
    }
}