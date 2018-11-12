import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab, datetimepicker, formatDateToSharepoint } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';

@inject(Element, Router, AppController, FormValidator)
export class Account {

    constructor(element, router, appController, formValidator) {
        // New
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.formValidator = formValidator;

        this.genderList = ["Male", "Female"];
    }

    activate(params, config, navigationInstruction) {
        let _self = this;

        this.userId = params.id;
        return new Promise((resolve) => {
            if (_self.userId) {
                _self.appController.webServices.getUserById(_self.userId).then(response => {
                    if (response && response.User) {
                        _self.appController.IsUserLogin = true;
                        _self.appController.populateModels(response.User);
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
        this.appController.configureAttached();
        this.initializeValidation('accountForm');
    }

    dtBirthdayChanged(valueIn) {
        var newDate = formatDateToSharepoint(valueIn);
        if (newDate && newDate != "Invalid date") {
            this.appController.model.Birthday = newDate;
        }
    }

    saveChanges() {
        let _self = this;

        if (this.runValidation() == false) {
            return;
        }

        let pass = '';
        if (this.appController.model.Password) {
            pass = this.appController.md5.calcMD5(this.appController.model.Password);
        }

        this.appController.webServices.updateAcount(this.appController.model, "User").then(response => {
            if (response.Result) {
                _self.appController.IsUserLogin = true;
                _self.appController.populateModels(response.User);
                _self.appController.toast.toastSuccess(`Changes have been saved successfully.`);
            }
            else {
                _self.appController.toast.toastError(`Changes have not been saved successfully.`);
            }
        });
    }

    initializeValidation(formId) { //pass in form element id
        let _self = this;
        this.valFields = {
            FirstName: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'First Name is required!' }
                }
            },
            LastName: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Last Name is required!' }
                }
            },
            PhoneNumber: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Phone Number is required!' }
                }
            },
            Gender: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Gender is required!' }
                }
            },
            Birthday: {
                enabled: false,
                validators: {
                    notEmpty: { message: 'Birthday is required!' }
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
            ConfirmPassword: {
                enabled: false,
                validators: {
                    //notEmpty: { message: 'Confirm Password is required!' },
                    callback: {
                        message: "Confirm password does not match, Type again!",
                        callback: function () {
                            if (_self.appController.model.Password && _self.appController.model.Password == _self.appController.model.ConfirmPassword) {
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
        //for (var field in this.fv.options.fields) {
        //    this.fv.enableFieldValidators(field, true);
        //};
        this.fv.enableFieldValidators("FirstName", doEnable);
        this.fv.enableFieldValidators("LastName", doEnable);
        this.fv.enableFieldValidators("PhoneNumber", doEnable);
        this.fv.enableFieldValidators("Gender", doEnable);
        this.fv.enableFieldValidators("Birthday", doEnable);
        this.fv.enableFieldValidators("Country", doEnable);
        this.fv.enableFieldValidators("City", doEnable);
        this.fv.enableFieldValidators("Address", doEnable);
        this.fv.enableFieldValidators("Email", doEnable);
        this.fv.enableFieldValidators("Username", doEnable);

        if (this.appController.model.Password) {
            this.fv.enableFieldValidators("ConfirmPassword", doEnable);
        }

    }

    runValidation() {
        this.enableFieldValidators();
        let fvInstances = [this.fv];
        return this.formValidator.getAndReportErrors(fvInstances);
    }
}