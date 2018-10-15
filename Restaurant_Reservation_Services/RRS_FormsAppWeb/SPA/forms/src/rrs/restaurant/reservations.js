import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';

import { RestaurantTable } from "model/restaurantTable";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';
import { TablesBook } from "model/tablesBook";
import { UserBooking } from "model/userBooking";
import $ from 'jquery';

@inject(Element, Router, AppController, FormValidator)
export class Reservations {

    constructor(element, router, appController, formValidator) {
        // New
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.formValidator = formValidator;
        this.ambienceViewModel = [];

        this.numberOfTableList = [];
        this.numberOfPersonsList = [];
        this.isLoading = false;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
        this.generateNumberOfTablesAndPersons();
    }

    attached() {
        let _self = this;

        this.appController.configureAttached();

        if (this.appController.model.RestaurantTables && this.appController.model.RestaurantTables.length > 0) {
            let tablesLength = this.appController.model.RestaurantTables.length;
            this.isLoading = true;
            _self.appController.webServices.getBookingTables(_self.appController.model.Id).then(response => {
                if (response.Result) {
                    for (let i = 0; i < response.UserBooking.length; i++) {
                        let book = response.UserBooking[i];
                        for (let t = 0; t < tablesLength; t++) {
                            let tableBook = new TablesBook();
                            let table = this.appController.model.RestaurantTables[t];
                            if (table.Id == book.RestaurantTableId) {
                                tableBook.Id = table.Id;
                                tableBook.NumberOfTable = table.NumberOfTable;
                                tableBook.NumberOfPersons = table.NumberOfPersons;
                                tableBook.Ambience = table.Ambience;
                                tableBook.IsBooking = table.IsBooking;

                                tableBook.IsActive = book.IsActive;
                                tableBook.RestaurantId = book.RestaurantId;
                                tableBook.RestaurantTableId = book.RestaurantTableId;
                                tableBook.UserId = book.UserId;
                                tableBook.Date = book.Date;
                                tableBook.Time = book.Time;
                                tableBook.ReservationName = book.ReservationName;
                                tableBook.ReservationPhoneNumber = book.ReservationPhoneNumber;

                                tableBook.IsDisabled = true;
                            }
                            else {
                                tableBook.Id = table.Id;
                                tableBook.NumberOfTable = table.NumberOfTable;
                                tableBook.NumberOfPersons = table.NumberOfPersons;
                                tableBook.Ambience = table.Ambience;
                                tableBook.IsActive = false;
                                tableBook.IsBooking = false;
                            }

                            _self.appController.RestaurantTableAndUserBooking.push(tableBook);
                        }
                    }

                    this.isLoading = false;
                }
            });
        }
    }

    saveChanges() {
        let _self = this;

        //this.appController.UserBooking.User = this.appController.model.Id;
        //this.appController.UserBooking.RestaurantId = this.appController.SelectedRestaurant.Id;
        //this.appController.UserBooking.IsActive = true;
        //this.appController.webServices.bookTable(this.appController.UserBooking).then(response => {
        //    _self.appController.toast.toastSuccess("Changes save succesfully!");

        //});
    }

    generateNumberOfTablesAndPersons() {
        let _self = this;
        for (let i = 0; i <= 100; i++) {
            _self.numberOfTableList.push(i);
        }
        for (let i = 0; i <= 20; i++) {
            _self.numberOfPersonsList.push(i);
        }
    }

    updateAvailabality(table) {
        let _self = this;
        let needToAddNewBook = false;
        let newUserBooking = new UserBooking();
        if (!table.IsActive) {
            newUserBooking.ReservationName = table.ReservationName;
            newUserBooking.ReservationPhoneNumber = table.ReservationPhoneNumber;
            newUserBooking.Time = table.Time;
            newUserBooking.Date = table.Date;
            newUserBooking.RestaurantId = table.RestaurantId;
            newUserBooking.RestaurantTableId = table.RestaurantTableId;
            newUserBooking.IsActive = true;

            needToAddNewBook = true;
        }

        this.appController.webServices.updateRestaurantTableAvailability(table.Id, table.IsBooking).then(response => {
            if (response != null) {
                table.IsBooking = response.IsBooking;
                table.IsDisabled = response.IsBooking;
                if (needToAddNewBook) {
                    customLog("Table Booking", newUserBooking, "info");
                    _self.appController.webServices.bookTable(newUserBooking).then(response => {
                        _self.appController.webServices.updateRestaurantTableAvailability(newUserBooking.RestaurantTableId, true).then(response => {
                            _self.appController.toast.toastSuccess(`Table updated succesfully!`);
                        });
                    });
                }
                else {
                    _self.appController.toast.toastSuccess(`Table updated succesfully!`);
                }
            }
            else {
                _self.appController.toast.toastError(`Table not updated succesfully!`);
            }
        });
    }

    // New
    handleDOM(count) {

        let _self = this;

        if (count == 0) {
            _self.isLoading = false;

            _self.appController.configureAttached();
        }
    }
}