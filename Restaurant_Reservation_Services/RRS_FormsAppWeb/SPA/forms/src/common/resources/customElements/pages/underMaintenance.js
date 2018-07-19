import { inject } from "aurelia-framework";
import { AppController } from "common/controllers/appController";

@inject(AppController)
export class UnderMaintenance {
    constructor(appController) {
        this.appController = appController;
    }

    attached() {
        $('body').addClass('gray-bg');
    }
}