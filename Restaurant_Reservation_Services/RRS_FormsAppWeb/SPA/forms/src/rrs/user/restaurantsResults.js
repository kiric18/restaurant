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

        this.name = params.name;
        return new Promise((resolve) => {
            if (_self.name === "all") {
                _self.appController.webServices.getAllRestaurants().then(response => {
                    if (response && response.Restaurants) {
                        _self.appController.RestaurantsResultsList = response.Restaurants;
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
        let _self = this;

    }

    navigateToRestaurant(res) {
        customLog("Selected Restaurant:", res, "info");
        let name = res.RestaurantInternalName;
        this.router.navigate(`#/user/selectedRes/${name.toLowerCase()}`);
    }
}
