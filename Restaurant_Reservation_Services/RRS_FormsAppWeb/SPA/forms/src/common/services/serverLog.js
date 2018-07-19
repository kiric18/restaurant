import { inject } from "aurelia-framework";
import 'fetch';
import { HttpClient } from 'aurelia-fetch-client';
import { Environment } from 'common/resources/config/environment';
import { Json } from "common/resources/scripts/json";
import { log, customLog } from 'common/resources/scripts/log';
import { getAureliaInternalRoute } from "common/resources/scripts/helper";

@inject(HttpClient, Json, Environment)
export class ServerLog {
    constructor(httpClient, json, environment) {
        this.http = new HttpClient();
        this.json = json;
        this.environment = environment;

        this.request_post_json = { method: "POST", headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: '' };

        this.http.configure(cfg => {
            cfg
                .withBaseUrl(this.environment.appUrl)
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
        });
    }

    defaultFetch(url, request) {
        customLog(`SOA request ${url}`, request);
        let promise = new Promise((resolve, reject) => {
            this.http.fetch(url, request).then(response => response.json()).then(data => {
                resolve(data);
            }).catch(err => {
                customLog('Sharepoint Log Access Error ', err, "error");
                reject(err);
            });
        });
        return promise;
    }

    // New
    generateRequestBody() {
        return this.json.clone(this.request_post_json);
    }

    addLogInfo(message, functionName, viewModelName, metadata) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'message':'${message}','functionName':'${functionName}','viewModelName':'${viewModelName}','aureliaPath':'${getAureliaInternalRoute()}','metadata':'${JSON.stringify(metadata)}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/log/addloginfo`, newRequest);
    }

    addLogError(message, functionName, viewModelName, metadata) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'message':'${message}','functionName':'${functionName}','viewModelName':'${viewModelName}','aureliaPath':'${getAureliaInternalRoute()}','metadata':'${JSON.stringify(metadata)}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/log/addlogerror`, newRequest);
    }
}