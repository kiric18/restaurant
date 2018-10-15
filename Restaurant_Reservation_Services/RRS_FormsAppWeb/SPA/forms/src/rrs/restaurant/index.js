import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { AlertMessages } from "common/resources/constants/alertMessages";
import { AppController } from "common/controllers/appController";
import { Environment } from 'common/resources/config/environment';
import { Restaurant } from 'model/restaurant';

@inject(AlertMessages, AppController, Environment, Restaurant)
export class Index {

    //#region constructor
    constructor(alertMessages, appController, environment, restaurant) {

        this.title = "Restaurant";
        this.modulePath = "restaurant";

        this.alertMessages = alertMessages;
        this.environment = environment;
        this.restaurant = restaurant;

        // New
        this.appController = appController;

        this.listFullNameAndCode = '';
        this.url = '';
    }
    //#endregion

    //#region configureRouter
    configureRouter(config, router) {
        this.router = router;
        this.isTwoColumns = true;

        //config.title = this.title;

        config.map([
            {
                route: ['', 'Home', 'h'],
                moduleId: `rrs/${this.modulePath}/home`,
                name: 'Home', title: 'Home', settings: { type: 'Restaurant', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Signup', 's'],
                moduleId: `rrs/${this.modulePath}/signup`,
                name: 'Signup', title: 'Sign up', settings: { type: 'Restaurant', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Login', 'l'],
                moduleId: `rrs/${this.modulePath}/login`,
                name: 'Login', title: 'Login', settings: { type: 'Restaurant', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Account', 'a'],
                moduleId: `rrs/${this.modulePath}/account`,
                name: 'Account', title: 'Account', settings: { type: 'Restaurant', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Reservations', 'r'],
                moduleId: `rrs/${this.modulePath}/reservations`,
                name: 'Reservations', title: 'Reservations', settings: { type: 'Restaurant', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
        ]);
    }
    //#endregion

    //#region activate
    activate(params, config, navigationInstruction) {
        let _self = this;

        this.listFullName = config.settings.listFullName;

        let promise = new Promise((resolve, reject) => {
            //if (!params.id) {
            //    _self.id = 0;
            //}
            //else {
            //    _self.id = params.id;
            //}

            _self.appController.webServices.getModel("Restaurant").then(response => {

                _self.appController.resetGlobalProperties(_self);
                _self.appController.IsRestaurant = config.settings.isRestaurant;
                _self.appController.populateModels(response.Restaurant);
                _self.appController.populateListOfTags(response);
                resolve();
            });
        });
        return promise;
    }
}