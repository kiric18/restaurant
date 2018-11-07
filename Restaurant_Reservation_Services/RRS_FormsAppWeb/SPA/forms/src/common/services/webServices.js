import { inject } from "aurelia-framework";
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
                customLog('Web Service - Web API Error ', err, "error");
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

    bookTable(model) {
        let newRequest = this.generateRequestBody();
        newRequest.dataType = 'json';
        newRequest.body = json(model);
        return this.defaultFetch(`${this.environment.appUrl}/user/BookTable/`, newRequest);
    }

    searchRestaurant(model) {
        let newRequest = this.generateRequestBody();
        newRequest.dataType = 'json';
        newRequest.body = json(model);
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/SearchRestaurant/`, newRequest);
    }

    search(search) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'search':'${search}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/Search/`, newRequest);
    }

    updateRestaurantTableAvailability(resTableId, IsBooking) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'restaurantTableId':'${resTableId}', 'IsBooking':'${IsBooking}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/UpdateRestaurantTableAvailability/`, newRequest);
    }

    updateUserBookingActive(userBookingId, isActive) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'userBookingId':'${userBookingId}', 'isActive':'${isActive}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/User/UpdateUserBookingActive/`, newRequest);
    }

    getAvailableRestaurantTables(restaurantId) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'restaurantId':'${restaurantId}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/GetAvailableRestaurantTables/`, newRequest);
    }

    getBookingTables(resId) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'resId':'${resId}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/User/GetBookingTables/`, newRequest);
    }

    uploadImages(files, restaurantId) {

        let request = { method: "POST", headers: new Headers(), body: new FormData() };
        request.body.append('restaurantId', restaurantId);

        for (let i = 0; i < files.length; i++) {
            request.body.append(files[i].name, files[i]);
        }

        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/UploadImages/?${this.environment.standardTokens}`, request);
    }

    getImages(restaurantId) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'restaurantId':'${restaurantId}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/GetImages/?${this.environment.standardTokens}`, newRequest);
    }

    deleteImage(imageId) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'imageId':'${imageId}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/DeleteImage/?${this.environment.standardTokens}`, newRequest);
    }

    uploadRestaurantTableImage(files, restaurantTableId) {
        let request = { method: "POST", headers: new Headers(), body: new FormData() };

        request.body.append('restaurantTableId', restaurantTableId);

        for (let i = 0; i < files.length; i++) {
            request.body.append(files[i].name, files[i]);
        }
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/UploadRestaurantTableImage/?${this.environment.standardTokens}`, request);
    }

    getRestaurantTableImage(restaurantTableId) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'restaurantTableId':'${restaurantTableId}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/GetRestaurantTableImage/?${this.environment.standardTokens}`, newRequest);
    }

    deleteRestaurantTableImage(restaurantTableId) {
        let newRequest = this.generateRequestBody();
        newRequest.body = `{'restaurantTableId':'${restaurantTableId}'}`;
        return this.defaultFetch(`${this.environment.appUrl}/Restaurant/DeleteRestaurantTableImage/?${this.environment.standardTokens}`, newRequest);
    }
}