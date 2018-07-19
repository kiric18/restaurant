import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';

import { RestaurantTable } from "model/restaurantTable";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import $ from 'jquery';

@inject(Element, Router, AppController)
export class Users {

    constructor(element, router, appController) {
        // New
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {
        this.appController.configureAttached();
    }
}