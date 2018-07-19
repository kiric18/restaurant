﻿import { inject } from "aurelia-framework";
import { HttpClient, json } from 'aurelia-fetch-client';
import 'fetch';
import { log, customLog } from 'common/resources/scripts/log';
import { Environment } from 'common/resources/config/environment';
import { Json } from "common/resources/scripts/json";

@inject(HttpClient, Environment, Json)
export class WebServices {

    constructor(httpClient, environment, json) {
        this.http = new HttpClient();
        this.environment = environment;
        this.json = json;
        this.request_post_json = { method: "POST", headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: ''};

        this.http.configure(cfg => {
            cfg
                .withBaseUrl(this.environment.soaURL)
                .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
        });
    }

    defaultFetch(url, request) {
        let promise = new Promise((resolve, reject) => {
            this.http.fetch(url, request).then(response => response.json()).then(data => {
                resolve(data);
            }).catch(err => {
                customLog('Central Repository Web API Error ', err, "error");
                reject(err);
            });
        });
        return promise;
    }

    generateRequestBody() {
        return this.json.clone(this.request_post_json);
    }

    getModel(controller) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{}`;
        return this.defaultFetch(`${this.environment.appUrl}/${controller}/GetModel/`, newRequest);
    }

    login(email, password, controller) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'email':'${email}', 'password':'${password}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/${controller}/Login/`, newRequest);
    }

    signup(model, controller) {
        let newRequest = this.generateRequestBody();
        newRequest.dataType = 'json';
        newRequest.body = json(model);
        return this.defaultFetch(`${this.environment.appUrl}/${controller}/Signup/`, newRequest);
    }

    updateAcount(model, controller ) {
        let newRequest = this.generateRequestBody();
        newRequest.dataType = 'json';
        newRequest.body = json(model);
        return this.defaultFetch(`${this.environment.appUrl}/${controller}/UpdateAccount/`, newRequest);
    }

    activateDeactivateRestaurant(restaurantId, isActive, controller) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'restaurantId':'${restaurantId}', 'isActive':'${isActive}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/${controller}/ActivateDeactivateRestaurant/`, newRequest);
    }

    searchRestaurant(model, controller) {
        let newRequest = this.generateRequestBody();
        newRequest.dataType = 'json';
        newRequest.body = json(model);
        return this.defaultFetch(`${this.environment.appUrl}/${controller}/SearchRestaurant/`, newRequest);
    }
}