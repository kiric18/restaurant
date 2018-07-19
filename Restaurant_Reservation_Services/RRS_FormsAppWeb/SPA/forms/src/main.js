import 'bootstrap';
//import 'fetch';
import { LogManager } from "aurelia-framework";
import { ConsoleAppender } from "aurelia-logging-console";
import { log, customLog } from 'common/resources/scripts/log';

//** to use the following levvels of logging
//** remove the .developmentLogging() from aurelia.use
LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);


export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        //.developmentLogging()
        .plugin('aurelia-dialog')
        .plugin('metismenu')
        .plugin('common/plugins/jquery.slimscroll.min')
        .plugin('common/plugins/inspinia')
        .plugin('moment')
        .plugin('common/plugins/footable.min')
        .plugin('common/plugins/formvalidation/formValidation.min')
        .plugin('common/plugins/formvalidation/framework/bootstrap.min')
        .plugin('common/plugins/jquery-ui.min')
        .plugin('common/plugins/bootstrap-datetimepicker.min')
        .plugin('common/plugins/selectize')
        //.plugin('common/plugins/modernizr-2.6.2.min.js')
        //.plugin('common/plugins/jquery.min.js')
        //.plugin('common/plugins/jquery.easing.1.3.js')
        //.plugin('common/plugins/jquery.waypoints.min.js')
        //.plugin('common/plugins/owl.carousel.min.js')
        //.plugin('common/plugins/jquery.countTo.js')
        //.plugin('common/plugins/jquery.magnific-popup.min.js')
        //.plugin('common/plugins/magnific-popup-options.js')
        //.plugin('common/plugins/main.js')
    //.plugin('jquery-ui')
    //.plugin('jquery-ui/ui/core')
    //.plugin('jquery-ui/ui/autocomplete')


    aurelia.start().then(a => { a.setRoot() });

}