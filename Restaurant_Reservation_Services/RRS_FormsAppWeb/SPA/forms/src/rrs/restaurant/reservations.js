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

        this.resId = params.id;
        return new Promise((resolve) => {
            if (_self.resId) {
                _self.appController.webServices.getRestaurantById(_self.resId).then(response => {
                    if (response.Restaurant && response.UserBooking) {
                        _self.appController.IsRestaurantLogin = true;
                        _self.appController.TablesBookingCount = response.UserBooking ? response.UserBooking.length : 0;
                        _self.appController.populateModels(response.Restaurant);
                    }
                    else {
                        _self.router.navigateToRoute("Home");
                    }
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
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
                            if (book.IsActive && table.IsBooking && table.Id == book.RestaurantTableId) {
                                tableBook.NumberOfTable = table.NumberOfTable;
                                tableBook.NumberOfPersons = table.NumberOfPersons;
                                tableBook.Ambience = table.Ambience;
                                tableBook.IsBooking = table.IsBooking;

                                tableBook.UserBookingId = book.Id;
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
                                //tableBook.UserBookingId = book.Id;
                                //tableBook.IsActive = book.IsActive;
                                tableBook.RestaurantTableId = table.Id;
                                tableBook.NumberOfTable = table.NumberOfTable;
                                tableBook.NumberOfPersons = table.NumberOfPersons;
                                tableBook.Ambience = table.Ambience;
                                tableBook.IsBooking = table.IsBooking;
                            }

                            _self.appController.RestaurantTableAndUserBooking.push(tableBook);
                        }
                    }

                    this.isLoading = false;
                }
            });
        }
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
        let newUserBooking = new UserBooking();

        if (!table.IsActive && table.IsBooking) {
            newUserBooking.ReservationName = table.ReservationName;
            newUserBooking.ReservationPhoneNumber = table.ReservationPhoneNumber;
            newUserBooking.Time = table.Time;
            newUserBooking.Date = table.Date;
            newUserBooking.RestaurantId = table.RestaurantId;
            newUserBooking.RestaurantTableId = table.RestaurantTableId;
            newUserBooking.IsActive = true;

            this.appController.webServices.bookTable(newUserBooking).then(response => {
                if (response) {
                    _self.appController.webServices.updateRestaurantTableAvailability(table.RestaurantTableId, table.IsBooking).then(response => {
                        if (response) {
                            table.IsBooking = response.IsBooking;
                            table.IsDisabled = response.IsBooking;
                            _self.appController.webServices.updateUserBookingActive(table.UserBookingId, table.IsBooking).then(response => {
                                if (response) {
                                    table.IsActive = response.IsActive;
                                    _self.appController.toast.toastSuccess(`Table booked succesfully!`);
                                }
                            });
                        }
                    });
                }
                else {
                    _self.appController.toast.toastError(`Table not booked succesfully!`);
                }
            });
        }
        else {
            this.appController.webServices.updateRestaurantTableAvailability(table.RestaurantTableId, table.IsBooking).then(response => {
                if (response) {
                    table.IsBooking = response.IsBooking;
                    table.IsDisabled = response.IsBooking;
                    table.ReservationName = '';
                    table.Date = '';
                    table.Time = '';
                    _self.appController.webServices.updateUserBookingActive(table.UserBookingId, table.IsBooking).then(response => {
                        if (response) {
                            table.IsActive = response.IsActive;
                            _self.appController.toast.toastSuccess(`Table booked succesfully!`);
                        }
                    });
                }
                else {
                    _self.appController.toast.toastError(`Table not booked succesfully!`);
                }
            });
        }
    }

    //// New
    //handleDOM(count) {
    //    let _self = this;
    //    if (count == 0) {
    //        _self.isLoading = false;
    //        _self.appController.configureAttached();
    //    }
    //}
}