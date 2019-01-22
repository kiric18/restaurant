import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab, formatDateToSharepoint, setMinTime, setMaxTime, formatTime } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';

@inject(Element, AppController, FormValidator)
export class SelectedRestaurant {

    constructor(element, appController, formValidator) {
        this.$element = $(element);
        this.appController = appController;
        this.formValidator = formValidator;
        this.numberOfPersonsList = [];
        this.ambienceViewModel = [];
        this.showTables = false;
        this.showMessage = false;
        this.disableNumberOfPersons = false;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
        this.resName = params.name;
        this.tableId = params.tableId;

        return new Promise((resolve) => {
            if (_self.resName) {
                _self.appController.webServices.getRestaurantByName(_self.resName).then(response => {
                    if (response.Restaurant) {
                        _self.appController.SelectedRestaurant = _self.appController.json.clone(response.Restaurant);
                    }
                    customLog(`Selected Table - ${_self.resName}`, _self.appController.SelectedRestaurant, "info");

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
        this.generateNumberOfTablesAndPersons();

        if (this.appController.SelectedRestaurant.OpeningHoursFrom) {
            setTimeout(_ => {
                setMinTime(_self.$element, "#Time", formatTime(_self.appController.SelectedRestaurant.OpeningHoursFrom));
                setMaxTime(_self.$element, "#Time", "22:30");
            }, 1);
        }

        if (this.appController.model.Id > 0) {
            this.appController.UserBooking.UserEmail = this.appController.model.Email;
            this.appController.UserBooking.ReservationPhoneNumber = this.appController.model.PhoneNumber;
            this.appController.UserBooking.ReservationName = this.appController.model.FirstName + " " + this.appController.model.LastName + " (" + this.appController.model.Username + ")";
        }

        if (this.appController.SelectedRestaurant.RestaurantTables && this.appController.SelectedRestaurant.RestaurantTables.length > 0) {
            for (let i = 0; i < this.appController.SelectedRestaurant.RestaurantTables.length; i++) {
                let table = this.appController.SelectedRestaurant.RestaurantTables[i];
                if (table.Id === parseInt(_self.tableId)) {
                    //if (!table.IsBooking) {
                        _self.showTables = true;
                        _self.disableNumberOfPersons = true;
                        _self.appController.UserBooking.RestaurantTableId = table.Id;
                        _self.appController.UserBooking.NumberOfPersons = table.NumberOfPersons;
                        table["IsSelected"] = true;
                    //}
                }
                else {
                    table["IsSelected"] = false;
                }
            }
        }

        this.initializeValidation('bookForm');
    }

    generateNumberOfTablesAndPersons() {
        let _self = this;
        for (let i = 1; i <= 20; i++) {
            _self.numberOfPersonsList.push(i);
        }
    }

    dtDateChanged(valueIn) {
        var newDate = formatDateToSharepoint(valueIn);
        if (newDate && newDate != "Invalid date") {
            this.appController.RestaurantSearch.Date = newDate;
        }
    }

    completeReservation() {
        let _self = this;

        if (this.runValidation() == false) {
            return;
        }
        this.appController.UserBooking.User = this.appController.model.Id;
        this.appController.UserBooking.RestaurantId = this.appController.SelectedRestaurant.Id;
        this.appController.UserBooking.IsActive = true;
        customLog("Table Booking", this.appController.UserBooking, "info");
        this.appController.webServices.checkIfTableIsBook(this.appController.UserBooking).then(response => {
            if (response.Result) {
                _self.appController.toast.toastWarning("The table is already booked! Please select other table or date!");
            }
            else if (!response.Result) {
                this.appController.webServices.bookTable(this.appController.UserBooking).then(response => {
                    _self.appController.webServices.updateRestaurantTableAvailability(_self.appController.UserBooking.RestaurantTableId, true).then(response => {
                        _self.showMessage = true;
                        _self.appController.toast.toastSuccess("Your table has been booking succesfully!");
                    });
                });
            }
        });
    }

    findTable() {
        let _self = this;

        this.showTables = true;
    }

    onSelectTable(event, selectedTable) {
        let _self = this;
        this.appController.UserBooking.RestaurantTableId = selectedTable.Id;

        for (let i = 0; i < this.appController.SelectedRestaurant.RestaurantTables.length; i++) {
            let table = this.appController.SelectedRestaurant.RestaurantTables[i];
            if (table.Id === selectedTable.Id) {
                table.IsSelected = true;
            }
            else if (!table.IsBooking) {
                table.IsSelected = false;
            }
        }
    }

    //selectedTable(selectedTable, index) {
    //    this.appController.UserBooking.RestaurantTableId = selectedTable.Id;
    //    for (let i = 0; i < this.appController.SelectedRestaurant.RestaurantTables.length; i++) {
    //        let table = this.appController.SelectedRestaurant.RestaurantTables[i];
    //        if (!table.IsBooking && selectedTable.IsBooking) {
    //            $(`#IsBooking${i}`).prop("disabled", true);
    //        }
    //        else {
    //            $(`#IsBooking${i}`).prop("disabled", false);
    //        }
    //    }
    //}

    initializeValidation(formId) { //pass in form element id
        let _self = this;
        this.valFields = {
            NumberOfPersons: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Number Of Persons is required!' }
                }
            },
            Date: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Date is required!' }
                }
            },
            Time: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Time is required!' }
                }
            },
            Email: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Email is required!' }
                }
            },
            ReservationName: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Reservation Name is required!' }
                }
            },
            ReservationPhoneNumber: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Reservation Phone Number is required!' }
                }
            },
        };

        this.fv = cookFV(this.valFields, this.$element, formId);
    }

    enableFieldValidators(doEnable = true) {
        for (var field in this.fv.options.fields) {
            this.fv.enableFieldValidators(field, doEnable);
        };
    }

    runValidation() {
        this.enableFieldValidators();
        let fvInstances = [this.fv];
        return this.formValidator.getAndReportErrors(fvInstances);
    }
}