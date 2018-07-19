import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab, datetimepicker, formatDateToSharepoint, setMinTime, setMinDate, setMaxDate, currentDate, currentTime } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import 'selectize';

@inject(Element, AppController)
export class Home {

    constructor(element, appController) {
        this.$element = $(element);
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
                    _self.appController.model.RestaurantSearch.Search.push(newObject);
                }
            },
            onItemRemove: function (value, $item) {
                var data = this.options[value];
                for (var i = 0; i < _self.appController.model.RestaurantSearch.Search.length; i++) {
                    if (data && data.Id) {
                        _self.appController.model.RestaurantSearch.Search.splice(i, 1);

                    }
                }
            },
        });

        setTimeout(_ => {
            setMinDate(_self.$element, "#Date", currentDate());
            setMinTime(_self.$element, "#Time", currentTime());
        });
    }

    dtDateChanged(valueIn) {
        var newDate = formatDateToSharepoint(valueIn);
        if (newDate && newDate != "Invalid date") {
            this.appController.model.RestaurantSearch.Date = newDate;
        }
    }

    search() {
        let _self = this;
        customLog(`Restaurant Search: `, this.appController.model.RestaurantSearch, "info");
        this.appController.webServices.searchRestaurant(this.appController.model.RestaurantSearch, "User").then(response => {
            customLog(`Restaurant Search Response: `, response, "info");
        });
    }
}