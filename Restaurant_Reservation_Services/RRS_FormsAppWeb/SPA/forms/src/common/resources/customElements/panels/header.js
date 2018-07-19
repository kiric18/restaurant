import { inject, bindable, computedFrom } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { log, customLog } from 'common/resources/scripts/log';
import { AppController } from "common/controllers/appController";
import $ from 'jquery';

@inject(Element, Router, AppController)
export class Header {

    constructor(element, router, appController) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
    }

    openPage(navigationPage) {

        this.router.navigateToRoute(navigationPage);
        //switch (navigationPage.toLowerCase()) {
        //    case 'welcome': {
        //        this.router.navigateToRoute(navigationPage);
        //        break;
        //    }
        //    case 'login': {
        //        this.router.navigateToRoute(navigationPage);
        //        break;
        //    }
        //    case 'signup': {
        //        this.router.navigateToRoute(navigationPage);
        //        break;
        //    }
        //    case 'register': {
        //        this.router.navigateToRoute(navigationPage);
        //        break;
        //    }
        //    case 'about': {
        //        this.router.navigateToRoute(navigationPage);
        //        break;
        //    }
        //    case 'contact': {
        //        this.router.navigateToRoute(navigationPage);
        //        break;
        //    }
        //}
    }
}