import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';

import { RestaurantTable } from "model/restaurantTable";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import { FormValidator, cookFV } from 'common/resources/scripts/formValidator';
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
    }

    saveChanges() {
        let _self = this;

        //this.appController.webServices.updateAcount(this.appController.model, "Restaurant").then(response => {
        //    if (response.Result) {
        //        _self.appController.IsRestaurantLogin = true;
        //        _self.appController.populateModels(response.Restaurant);
        //        _self.appController.toast.toastSuccess(`Changes saved succesfully!`);
        //    }
        //    else {
        //        _self.appController.toast.toastError("Changes not saved succesfully. Please try again!", "toast-top-center", true);
        //    }
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
}