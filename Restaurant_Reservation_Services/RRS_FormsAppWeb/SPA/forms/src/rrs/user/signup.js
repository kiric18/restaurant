import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';
import $ from 'jquery';

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

        //this.appController.model.Password = this.appController.md5.calcMD5(this.appController.model.Password);
        this.appController.webServices.signup(this.appController.model, "User").then(response => {
            if (response.Result) {
                _self.appController.IsUserLogin = true;
                _self.appController.populateModels(response.User);
                _self.router.navigateToRoute("Account");
            }
            else {
                _self.appController.toast.toastError("Email account already exists!", true);
            }
        });
    }

    initializeValidation(formId) { //pass in form element id
        let _self = this;
        this.valFields = {
            Email: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Email is required!' }
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
                            if (_self.appController.model.Password == _self.appController.model.ConfirmPassword) {
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
            this.fv.enableFieldValidators(field, true);
        };
    }

    runValidation() {
        this.enableFieldValidators();
        let fvInstances = [this.fv];
        return this.formValidator.getAndReportErrors(fvInstances);

        //if (!this.appController.model.Email && !this.appController.model.Password) {
        //    this.appController.toast.toastError("Email and Password are required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.Email) {
        //    this.appController.toast.toastError("Email is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.Password) {
        //    this.appController.toast.toastError("Password is required.", true);
        //    return false;
        //}
        //else if (!this.appController.model.ConfirmPassword) {
        //    this.appController.toast.toastError("Confirm Password is required.", true);
        //    return false;
        //}
        //else if (this.appController.model.Password != this.appController.model.ConfirmPassword) {
        //    this.appController.toast.toastError("Confirm password doesn't match, Type again!", true);
        //    return false;
        //}
        //return true;
    }
}