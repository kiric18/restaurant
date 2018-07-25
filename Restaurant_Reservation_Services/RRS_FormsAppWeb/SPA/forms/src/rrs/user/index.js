import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { AppController } from "common/controllers/appController";
import { Environment } from 'common/resources/config/environment';

@inject(AppController, Environment)
export class Index {

    //#region constructor
    constructor(appController, environment) {

        this.title = "User";
        this.modulePath = "user";

        this.appController = appController;
        this.environment = environment;

        // New

        this.listFullNameAndCode = '';
        this.url = '';
    }
    //#endregion

    //#region configureRouter
    configureRouter(config, router) {
        this.router = router;
        this.isTwoColumns = true;

        config.title = this.title;

        config.map([
            {
                route: ['', 'Home'],
                moduleId: `rrs/${this.modulePath}/home`,
                name: 'Home', title: 'Home', settings: { type: 'User', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Signup'],
                moduleId: `rrs/${this.modulePath}/signup`,
                name: 'Signup', title: 'Sign up', settings: { type: 'User', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Login'],
                moduleId: `rrs/${this.modulePath}/login`,
                name: 'Login', title: 'Login', settings: { type: 'User', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['Account'],
                moduleId: `rrs/${this.modulePath}/account`,
                name: 'Account', title: 'Account', settings: { type: 'User', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['RestaurantsResults'],
                moduleId: `rrs/${this.modulePath}/restaurantsResults`,
                name: 'RestaurantsResults', title: 'RestaurantsResults', settings: { type: 'User', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
            {
                route: ['SelectedRestaurant'],
                moduleId: `rrs/${this.modulePath}/selectedRestaurant`,
                name: 'SelectedRestaurant', title: 'SelectedRestaurant', settings: { type: 'User', icon: '', isVisible: true, completed: false, color: '' }, nav: true,
            },
        ]);
    }
    //#endregion

    //#region activate
    activate(params, config, navigationInstruction) {
        let _self = this;
        _self.listFullName = config.settings.listFullName;
        let promise = new Promise((resolve, reject) => {
            _self.appController.webServices.getModel("User").then(response => {
                _self.appController.resetGlobalProperties(_self);
                _self.appController.IsUser = config.settings.isUser;
                _self.appController.populateModels(response.User);
                _self.appController.populateListOfTags(response);
                resolve();
            });
        });
        return promise;
    }
}