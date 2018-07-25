import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";


@inject(Element, AppController)
export class SelectedRestaurant {

    constructor(element, appController) {
        this.$element = $(element);
        this.appController = appController;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {
        let _self = this;

    }
}