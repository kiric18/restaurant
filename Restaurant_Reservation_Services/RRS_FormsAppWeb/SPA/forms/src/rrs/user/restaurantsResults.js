import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";


@inject(Element, Router, AppController)
export class RestaurantsResults {

    constructor(element, router, appController) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {
        let _self = this;

    }

    navigateToRestaurant(res) {
        customLog("Selected Restaurant:", res, "info");
        this.appController.SelectedRestaurant = this.appController.json.clone(res);
        this.router.navigateToRoute("SelectedRestaurant");
    }
}
