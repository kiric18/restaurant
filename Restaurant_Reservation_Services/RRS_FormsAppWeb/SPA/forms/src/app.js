import { inject } from 'aurelia-framework';
import { Redirect } from 'aurelia-router';
import { Router } from 'aurelia-router';
import { documentReady } from 'common/resources/config/init';

import { Environment } from 'common/resources/config/environment';
import { log, customLog } from 'common/resources/scripts/log';
import { getQueryStringParameter, SetSessionStorage } from "common/resources/scripts/helper";

@inject( Router)
export class App {
    constructor(router) {
        this.router = router;
    }

    configureRouter(config, router) {
        this.router = router;
        this.isTwoColumns = true;

        config.title = "Restaurant Reservation Sevrvices";

        config.map([
            {
                route: ['notAuthorized'], name: 'notAuthorized',
                viewPorts: { mainContent: { moduleId: 'common/resources/customElements/pages/notAuthorized' }, },
            },
            {
                route: ['underMaintenance'], name: 'underMaintenance',
                viewPorts: { mainContent: { moduleId: 'common/resources/customElements/pages/underMaintenance' }, },
            },
            {
                route: ['', 'admin/'],
                viewPorts: { mainContent: { moduleId: 'rrs/admin/index' }, },
                name: 'Admin', title: 'Admin',
                settings: {
                    listFullName: 'Admin',
                    isAdmin: true,
                    isUser: false,
                    isRestaurant: false,
                }
            },
            {
                route: [ 'user/'],
                viewPorts: { mainContent: { moduleId: 'rrs/user/index' }, },
                name: 'User', title: 'User',
                settings: {
                    listFullName: 'User',
                    isAdmin: false,
                    isUser: true,
                    isRestaurant: false,
                }
            },
            {
                route: ['restaurant/', 'res/'],
                viewPorts: { mainContent: { moduleId: 'rrs/restaurant/index' }, },
                name: 'Restaurant', title: 'Restaurant',
                settings: {
                    listFullName: 'Restaurant',
                    isAdmin: false,
                    isUser: false,
                    isRestaurant: true,
                }
            },
        ]);
    }
}
//#endregion