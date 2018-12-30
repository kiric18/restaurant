import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';

@inject(Element, Router, AppController, FormValidator)
export class Login {

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
        this.initializeValidation('loginForm');
    }

    login() {
        let _self = this;

        if (this.runValidation() == false) {
            return;
        }

        //let pass = this.appController.md5.calcMD5(this.appController.model.Password);
        this.appController.webServices.login(this.appController.model.Email, this.appController.model.Password, "User").then(response => {
            if (response.Result && response.User) {
                _self.appController.IsUserLogin = true;
                _self.appController.populateModels(response.User);
                _self.router.navigateToRoute("Home");
            }
            else if (response.Result && !response.IsLoginCorrected) {
                _self.appController.toast.toastError("Invalid email or password. Please re-enter your login info.", true);
            }
            else {
                _self.appController.toast.toastError("Account does not exists. Please Sign up!", true);
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
            }
        };

        this.fv = cookFV(this.valFields, this.$element, formId);
    }

    enableFieldValidators(doEnable = true) {
        //for (var field in this.fv.options.fields) {
        //    this.fv.enableFieldValidators(field, doEnable);
        //};

        this.fv.enableFieldValidators("Email", doEnable);
        this.fv.enableFieldValidators("Password", doEnable);
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
        //return true;
    }
}