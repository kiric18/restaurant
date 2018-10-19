import { Popup } from 'common/resources/scripts/popup';
import { Toast } from 'common/resources/scripts/toast';
import { inject } from 'aurelia-framework';

@inject(Popup, Toast)
export class FormValidator {
    constructor(popup, toast) {
        this.popup = popup;
        this.toast = toast;
    }

    revalidate(formValidatorInstance) {
        for (var field in formValidatorInstance.options.fields) {
            formValidatorInstance.revalidateField(field);
        }
    }

    // Pass in a formValidation jQuery object reference
    getErrors(fvsArray) {
        let _self = this;
        var errorList = [];

        fvsArray.forEach(function (fvInstance) {
            if (fvInstance) {
                _self.revalidate(fvInstance);
                fvInstance.validate();
                if (fvInstance.isValid() == false) {
                    var formValidatorErrors = fvInstance.getMessages();
                    formValidatorErrors.forEach(function (element) {
                        errorList.push(element);
                    });
                }
            }
        });

        return errorList;
    }

    reportErrors(errorList) {
        if (errorList && errorList.length > 0) {
            var errorString = "<u>Please fix the following errors before continuing</u>:\n<br> <ul>";
            errorList.forEach(function (element) {
                errorString = errorString.concat("<li>" + element + "</li>");
            });
            errorString.concat("</ul>");
            this.popup.popupError(errorString, "");
        }
    }

    getAndReportErrors(fvsArray) {
        var errors = this.getErrors(fvsArray);
        if (errors && errors.length > 0) {
            this.toast.toastError("Please fix the required fields before continuing!", true);
            //this.reportErrors(errors);//Remove this current line if no popup is wanted
            return false;
        }
        return true;
    }
}

export function tryRemoveField(fvInstance, fieldName) {
    if (fvInstance) {
        try {
            fvInstance.removeField(fieldName);
        } catch (e) {
            console.log('Exception caught when trying to remove field:' + fieldName, e);
        }
    }
}

//vm is not used at the momemnt
export function cookFV(fields, element, formId, vm) {
    element.find("#" + formId).formValidation({
        framework: 'bootstrap',
        trigger: 'blur keyup change focus',
        icon: {
            valid: 'fa fa-ok',
            invalid: 'fa fa-remove',
            validating: 'fa fa-refresh'
        },
        fields: fields
    }).onStatus;

    return element.find("#" + formId).data('formValidation'); //setting direct reference to FormValidation instance
}