import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';

import { RestaurantTable } from "model/restaurantTable";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';
import $ from 'jquery';

@inject(Element, Router, AppController, FormValidator)
export class Account{

    constructor(element, router, appController, formValidator) {
        // New
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.formValidator = formValidator;
        this.ambienceViewModel = [];

        this.numberOfTableList = [];
        this.numberOfPersonsList = [];
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
        //if (this.appController.model.Id == 0) {
        //    //this.appController.toast.toastWarning("First you need to login", "toast-top-center", true);
        //    this.router.navigate("#/restaurant/login");
        //}
        this.generateNumberOfTablesAndPersons();
    }

    attached() {
        this.appController.configureAttached();
        this.initializeValidation('accountForm');
    }

    saveChanges() {
        let _self = this;

        if (this.runValidation() == false) {
            return;
        }

        if (this.appController.model.RestaurantManager.Password) {
            this.appController.model.RestaurantManager.Password = this.appController.md5.calcMD5(this.appController.model.RestaurantManager.Password);
        }
        else {
            delete this.appController.model.RestaurantManager.Password;
        }
        delete this.appController.model.ConfirmPassword;


        this.appController.webServices.updateAcount(this.appController.model, "Restaurant").then(response => {
            if (response.Result) {
                _self.appController.IsRestaurantLogin = true;
                _self.appController.populateModels(response.Restaurant);
                _self.appController.toast.toastSuccess(`Changes saved succesfully!`);
            }
            else {
                _self.appController.toast.toastError("Changes not saved succesfully. Please try again!", "toast-top-center", true);
            }
        });
        //closeTab();
    }

    generateNumberOfTablesAndPersons() {
        let _self = this;
        let tablesNumber = 0;
        for (let i = 1; i < 100; i++) {
            tablesNumber++;
            _self.numberOfTableList.push(tablesNumber);
        }

        let personsNumber = 1;
        for (let i = 1; i < 20; i++) {
            personsNumber++;
            _self.numberOfPersonsList.push(personsNumber);
        }
    }

    addColumn() {
        let _self = this;
        let restaurantTable = new RestaurantTable();
        this.appController.model.RestaurantTables.push(restaurantTable);
    }

    removeColumn(index) {
        let _self = this;
        this.appController.model.RestaurantTables.splice(index, 1);
        this.ambienceViewModel[index].setSelectize();
    }

    initializeValidation(formId) { //pass in form element id
        let _self = this;
        this.valFields = {
            RestaurantName: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Restaurant Name is required!' }
                }
            },
            PhoneNumber: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Phone Number is required!' }
                }
            },
            Country: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Country is required!' }
                }
            },
            City: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'City is required!' }
                }
            },
            Address: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Address is required!' }
                }
            },
            OpeningHoursFrom: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Opening Hours From is required!' }
                }
            },
            OpeningHoursTo: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Opening Hours To is required!' }
                }
            },
            Amenities: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Amenities is required!' },
                    callback: {
                        message: "Amenities is required!",
                        callback: function () {
                            if (_self.appController.model.RestaurantAmenities.length > 0) {
                                //_self.amenitiesVM.addRemoveClass(false);
                                return true;
                            }
                            //_self.amenitiesVM.addRemoveClass(true);
                            return false;
                        }
                    }
                }
            },
            Style: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Style is required!' },
                    callback: {
                        message: "Style is required!",
                        callback: function () {
                            if (_self.appController.model.RestaurantStyles.length > 0) {
                               // _self.styleVM.addRemoveClass(false);
                                return true;
                            }
                            //_self.styleVM.addRemoveClass(true);
                            return false;
                        }
                    }
                }
            },
            PaymentMethods: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Payment Methods is required!' },
                    callback: {
                        message: "Payment Methods is required!",
                        callback: function () {
                            if (_self.appController.model.RestaurantPaymentMethods.length > 0) {
                                //_self.paymentMethodsVM.addRemoveClass(false);
                                return true;
                            }
                           // _self.paymentMethodsVM.addRemoveClass(true);
                            return false;
                        }
                    }
                }
            },
            RestaurantTables: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Payment Methods is required!' },
                    callback: {
                        message: "Restaurant Tables are required!",
                        callback: function () {
                            if (_self.appController.model.RestaurantTables.length > 0) {
                                return true;
                            }
                            return false;
                        }
                    }
                }
            },
            Description: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Description is required!' }
                }
            },
            Email: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Email is required!' }
                }
            },
            ManagerName: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Manager Name is required!' }
                }
            },
            Username: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Username is required!' }
                }
            },
            Password: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Password is required!' },
                    callback: {
                        message: "Password is required!",
                        callback: function () {
                            if (!_self.appController.model.ConfirmPassword) {
                                return true;
                            }
                            return false;
                        }
                    }
                }
            },
            ConfirmPassword: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Confirm Password is required!' },
                    callback: {
                        message: "Confirm password doesn't match, Type again!",
                        callback: function () {
                            if (_self.appController.model.RestaurantManager.Password == _self.appController.model.ConfirmPassword) {
                                return true;
                            }
                            return false;
                        }
                    }
                }
            }
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