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

        this.title = "Admin";
        this.modulePath = "admin";

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
                route: ['', 'Home'],
                moduleId: `rrs/${this.modulePath}/home`,
                name: 'Home', title: 'Home', settings: { type: 'Admin', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Login'],
                moduleId: `rrs/${this.modulePath}/login`,
                name: 'Login', title: 'Login', settings: { type: 'Admin', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Restaurants'],
                moduleId: `rrs/${this.modulePath}/Restaurants`,
                name: 'Restaurants', title: 'Restaurants', settings: { type: 'Admin', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Users'],
                moduleId: `rrs/${this.modulePath}/users`,
                name: 'Users', title: 'Users', settings: { type: 'Admin', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
        ]);
    }
    //#endregion

    //#region activate
    activate(params, config, navigationInstruction) {
        let _self = this;

        this.listFullName = config.settings.listFullName;

        let promise = new Promise((resolve, reject) => {
            _self.appController.webServices.getModel("Admin").then(response => {
                _self.appController.resetGlobalProperties(_self);
                _self.appController.IsAdmin = config.settings.isAdmin;
                _self.appController.populateModels(response);
                resolve();
            });
        });
        return promise;
    }
}