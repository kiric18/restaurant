import { inject, bindable, computedFrom } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { AppController } from "common/controllers/appController";
import $ from 'jquery';

@inject(Element, Router, AppController)
export class NavBarTop {

    constructor(element, router, appController) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
    }

    openPage(navigationPage) {
        //this.router.navigateToRoute(navigationPage);
        switch (navigationPage) {
            case 'Home': {
                this.appController.RestaurantsResultsList = [];
                this.appController.SelectedRestaurant = [];
                this.appController.resetRestaurantSearch();
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Login': {
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Signup': {
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Account': {
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Users': {
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Restaurants': {
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Reservations': {
                this.router.navigateToRoute(navigationPage);
                break;
            }
            case 'Logout': {
                let _self = this;
                this.appController.resetLogoutGlobalProperties();
                this.router.navigateToRoute('Home');
                break;
            }
            //case 'About': {
            //    this.router.navigateToRoute(navigationPage);
            //    break;
            //}
            //case 'Contact': {
            //    this.router.navigateToRoute(navigationPage);
            //    break;
            //}
        }
    }
}