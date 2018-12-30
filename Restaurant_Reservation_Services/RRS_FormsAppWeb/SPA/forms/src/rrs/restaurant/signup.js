import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab, replaceAll } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';
import $ from 'jquery';
import { Restaurant } from "../../model/restaurant";

@inject(Element, Router, AppController, FormValidator)
export class Signup {

    constructor(element, router, appController, formValidator) {
        // New
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.formValidator = formValidator;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {
        this.appController.configureAttached();
        this.initializeValidation('signupForm');
    }

    signup() {
        let _self = this;

        if (this.runValidation() == false) {
            return;
        }

        //this.appController.model.RestaurantManager.Password = this.appController.md5.calcMD5(this.appController.model.RestaurantManager.Password);
        this.appController.model.RestaurantInternalName = replaceAll(this.appController.model.RestaurantName, " ", "-");
        customLog("Restaurant Model:", this.appController.model, "info");

        this.appController.webServices.signup(this.appController.model, "Restaurant").then(response => {
            if (response.Result) {
                if (!response.Restaurant.IsActive) {
                    _self.appController.toast.toastSuccess(`Restaurant SignUp succesfully. Please wait for your activation.`);
                }
            }
            else {
                _self.appController.toast.toastError("Restaurant account already exists!", true);
            }
        });
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
            ManagerName: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Manager Name is required!' }
                }
            },
            Email: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Email is required!' }
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
                    notEmpty: { message: 'Password is required!' }
                }
            },
            ConfirmPassword: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Confirm Password is required!' },
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

        //if (!this.appController.model.RestaurantName && !this.appController.model.RestaurantManager.ManagerName &&
        //    !this.appController.model.RestaurantManager.Username && !this.appController.model.RestaurantManager.Email &&
        //    !this.appController.model.RestaurantManager.Password) {
        //    this.appController.toast.toastError("All fields are required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.RestaurantName) {
        //    this.appController.toast.toastError("Restaurant Name is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.RestaurantManager.ManagerName) {
        //    this.appController.toast.toastError("Manager Name is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.RestaurantManager.Username) {
        //    this.appController.toast.toastError("Username is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.RestaurantManager.Email) {
        //    this.appController.toast.toastError("Email is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.RestaurantManager.Password) {
        //    this.appController.toast.toastError("Password is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.ConfirmPassword) {
        //    this.appController.toast.toastError("Confirm Password is required.", true);
        //    return false;
        //}
        //else if (this.appController.model.RestaurantManager.Password != this.appController.model.ConfirmPassword) {
        //    this.appController.toast.toastError("Confirm password doesn't match, Type again!", true);
        //    return false;
        //}
        //return true;
    }
}