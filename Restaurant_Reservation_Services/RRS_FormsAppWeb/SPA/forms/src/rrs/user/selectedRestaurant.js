﻿import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab, setMinTime, setMaxTime, formatTime } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";


@inject(Element, AppController)
export class SelectedRestaurant {

    constructor(element, appController) {
        this.$element = $(element);
        this.appController = appController;
        this.numberOfPersonsList = [];
        this.ambienceViewModel = [];
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {
        let _self = this;
        this.generateNumberOfTablesAndPersons();

        if (this.appController.SelectedRestaurant.OpeningHoursFrom) {
            setTimeout(_ => {
                setMinTime(_self.$element, "#Time", formatTime(_self.appController.SelectedRestaurant.OpeningHoursFrom));
                setMaxTime(_self.$element, "#Time", "22:30");
            }, 1);
        }
    }

    dtDateChanged(valueIn) {
        var newDate = formatDateToSharepoint(valueIn);
        if (newDate && newDate != "Invalid date") {
            this.appController.RestaurantSearch.Date = newDate;
        }
    }

    generateNumberOfTablesAndPersons() {
        let _self = this;
        for (let i = 1; i <= 20; i++) {
            _self.numberOfPersonsList.push(i);
        }
    }

    completeReservation() {
        customLog("Table Booking", this.appController.UserBooking, "info");
        this.appController.UserBooking.Restaurant = this.appController.SelectedRestaurant;
        this.appController.webServices.bookTable().then(response => {

        });
    }
}