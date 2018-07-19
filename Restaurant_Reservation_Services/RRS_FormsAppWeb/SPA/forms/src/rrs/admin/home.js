import { inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { closeTab } from 'common/resources/scripts/helper';
import { AppController } from "common/controllers/appController";

@inject(AppController)
export class Home {

    constructor(appController) {
        // New
        this.appController = appController;
    }

    activate(params, config, navigationInstruction) {
        let _self = this;
    }

    attached() {

    }
}