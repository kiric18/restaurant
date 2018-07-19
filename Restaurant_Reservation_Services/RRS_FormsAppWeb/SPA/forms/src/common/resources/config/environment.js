import { getQueryStringParameter, getHostNameUrl, getCurrentHostNameUrl, stripTrailingSlash } from "common/resources/scripts/helper";

export class Environment {
    constructor() {

        this.HSDataDevEnvironment = window.location.href.indexOf('localhost') > -1;

        this.version = 'v.1.0';
        this.appUrl = getCurrentHostNameUrl(); //Dynamic
        //this.spHostUrl = stripTrailingSlash(getQueryStringParameter("SPHostUrl")); //Dynamic
        //this.spHostUrlHostName = getHostNameUrl(this.spHostUrl);

        if (this.HSDataDevEnvironment) {
            this.soaURL = this.appUrl;
            //this.controlCenterUrl = "http://sp2013-dev04.hsddev.local:9092";
            //this.controlCenterApiUrl = this.appUrl;
        }
    }
}