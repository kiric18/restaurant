import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';

import { RestaurantTable } from "model/restaurantTable";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";
import $ from 'jquery';

@inject(Element, Router, AppController)
export class Restaurants {

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

    activeted(restaurant) {
        let _self = this;

        this.appController.webServices.activateDeactivateRestaurant(restaurant.Id, true, "Admin").then(response => {
            if (response.Result) {
                _self.appController.IsAdmin = true;
                _self.appController.populateAdminList(response);
                _self.appController.toast.toastSuccess(`Restaurant activated!`);
            }
            else {
                _self.appController.toast.toastError("Restaurant not activated. Please try again!", true);
            }
        });
    }

    deactiveted(restaurant) {
        let _self = this;
        this.appController.webServices.activateDeactivateRestaurant(restaurant.Id, false, "Admin").then(response => {
            if (response.Result) {
                _self.appController.IsAdmin = true;
                _self.appController.populateAdminList(response);
                _self.appController.toast.toastSuccess(`Restaurant deactivated!`);
            }
            else {
                _self.appController.toast.toastError("Restaurant not activated. Please try again!", true);
            }
        });
    }
}