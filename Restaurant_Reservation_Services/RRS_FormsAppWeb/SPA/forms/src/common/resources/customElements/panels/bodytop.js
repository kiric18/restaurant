import { inject } from "aurelia-framework";
import { User } from "model/user";
import { Router } from 'aurelia-router';
import { AppController } from "common/controllers/appController";
import { replaceAll } from "common/resources/scripts/helper";

@inject(User, Router, AppController)
export class BodyTop {

    constructor(user, router, appController) {
        this.user = user;
        this.router = router;
        this.appController = appController;
        this.defaultLogo = "/SPA/workflowforms/assets/images/smartflow_logo_small.png";
    }

    // New
    goToCurrentPage() {

        let pageToNavigate = replaceAll(this.appController.model.ActivePage, " ", "");
        this.router.navigateToRoute(pageToNavigate);
    }
}