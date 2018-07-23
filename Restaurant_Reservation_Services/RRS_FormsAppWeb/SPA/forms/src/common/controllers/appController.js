import { inject } from "aurelia-framework";
import { Environment } from "common/resources/config/environment";
import { Json } from "common/resources/scripts/json";
import { log, customLog } from 'common/resources/scripts/log';
import { CommonMessages } from 'common/resources/constants/commonMessages';
import { CommonNames } from 'common/resources/constants/commonNames';
import { GetSessionStorage, currentTime } from "common/resources/scripts/helper";
import { HistoryEntry } from "model/historyEntry";
import { WebServices } from "common/services/webServices";
import { Md5 } from "common/services/md5";
import { Popup } from 'common/resources/scripts/popup';
import { Toast } from 'common/resources/scripts/toast';
import { Error } from 'common/resources/scripts/error';
import { User } from "model/user.js"
import { Restaurant } from "model/restaurant.js"

@inject(Environment, Json, CommonMessages, CommonNames, Popup, Toast, Error, WebServices, User, Restaurant, Md5)
export class AppController {
    constructor(environment, json, commonMessages, commonNames, popup, toast, error, webServices, user, restaurant, md5) {
        this.environment = environment;
        this.json = json;
        this.popup = popup;
        this.toast = toast;
        this.error = error;
        this.webServices = webServices;
        this.commonMessages = commonMessages; // Used as reference to reduce injections in ViewModels
        this.commonNames = commonNames;
        this.user = user;
        this.restaurant = restaurant;
        this.md5 = md5;

        this.RestaurantsList = [];
        this.RestaurantsResultsList = [];
        this.UsersList = [];

        this.CuisinesList = [];
        this.AmenitiesList = [];
        this.PaymentMethodsList = [];
        this.AmbiencesList = [];
        this.StylesList = [];
        this.RestaurantNamesList = [];
        this.RestaurantSearch = [];
        this.LocationsList = [
            { 'Id': 'Famagusta', 'Name': 'Famagusta', 'Description': 'Famagusta' },
            { 'Id': 'Nicosia', 'Name': 'Nicosia', 'Description': 'Nicosia' },
            { 'Id': 'Limassol', 'Name': 'Limassol', 'Description': 'Limassol' },
            { 'Id': 'Larnaca', 'Name': 'Larnaca', 'Description': 'Larnaca' },
            { 'Id': 'Pafos', 'Name': 'Pafos', 'Description': 'Pafos' },
        ];

        this.model = [];
        this.originalModel = [];
        this.relatedModel = [];
        this.backupModel = {};

        this.IsAdminLogin = false;
        this.IsAdmin = false;
        this.IsUserLogin = false;
        this.IsUser = false;
        this.IsRestaurantLogin = false;
        this.IsRestaurant = false;

        this.processRouter;

        this.HeaderText = "";

        // TODO: Be able to detect if the form is saving
        //this.isSaving = false;
    }

    populateListOfTags(response) {
        this.CuisinesList = this.json.clone(response.CuisinesList);
        this.AmenitiesList = this.json.clone(response.AmenitiesList);
        this.PaymentMethodsList = this.json.clone(response.PaymentMethodsList);
        this.AmbiencesList = this.json.clone(response.AmbiencesList);
        this.StylesList = this.json.clone(response.StylesList);
        if (this.IsUser) {
            this.RestaurantNamesList = this.json.clone(response.RestaurantNamesList);
            this.RestaurantSearch = this.json.clone(response.SearchRestaurant);
        }
    }

    populateModels(response) {
        this.model = response;

        if (this.IsRestaurant) {

            this.model.ConfirmPassword = '';
            this.model.RestaurantManager.Password = '';
            this.model.RestaurantStyles = this.model.RestaurantStyles || [];
            this.model.RestaurantPaymentMethods = this.model.RestaurantPaymentMethods || [];
            this.model.RestaurantAmenities = this.model.RestaurantAmenities || [];
            this.model.RestaurantTables = this.model.RestaurantTables || [];
        }
        else if (this.IsUser) {
            this.model.Password = '';
            this.model.ConfirmPassword = '';
            this.model.UserBookings = this.model.UserBookings || [];
            this.model.UserFavoriteRestaurnats = this.model.UserFavoriteRestaurnats || [];
            this.model.UserRestaurnatReviews = this.model.UserRestaurnatReviews || [];
        }

        this.originalModel = this.json.clone(this.model);
        customLog(`Is Admin: ${this.IsAdmin}, Is User: ${this.IsUser}, Is Restaurant: ${this.IsRestaurant}, Model: `, this.model, "info");
    }

    populateAdminList(response) {
        this.RestaurantsList = this.json.clone(response.Restaurants);
        this.UsersList = this.json.clone(response.Users);
    }

    resetGlobalProperties(caller) {
        this.ListFullName = caller.listFullName;
        this.RelatedListFullName = caller.relatedListFullName;

        this.model = [];
        this.originalModel = [];

        this.RestaurantsList = [];
        this.UsersList = [];

        this.CuisinesList = [];
        this.AmenitiesList = [];
        this.PaymentMethodsList = [];
        this.AmbiencesList = [];
        this.StylesList = [];

        this.IsUserLogin = false;
        this.IsUser = false;
        this.IsRestaurantLogin = false;
        this.IsRestaurant = false;
        this.IsAdminLogin = false;
        this.IsAdmin = false;
    }

    resetLogoutGlobalProperties() {
        this.IsUserLogin = false;
        this.IsRestaurantLogin = false;
        this.IsAdminLogin = false;
        if (this.IsAdmin) {
            this.RestaurantsList = [];
            this.UsersList = [];
        }
        else if (this.IsRestaurant) {
            this.resetRestaurantModel();
        }
        else if (this.IsUser){
            this.resetUserModel();
        }
    }

    resetRestaurantModel() {
        this.model.Id = 0;
        this.model.RestaurantName = "";
        this.model.Address = "";
        this.model.City = "";
        this.model.Country = "";
        this.model.Desrciption = "";
        this.model.PhoneNumber = "";
        this.model.OpeningHoursTo = "";
        this.model.OpeningHoursFrom = "";
        this.model.RestaurantStyles = [];
        this.model.RestaurantAmenities = [];
        this.model.RestaurantPaymentMethods = [];
        this.model.RestaurantTables = [];

        this.model.ConfirmPassword = "";
        this.model.RestaurantManager.Email = "";
        this.model.RestaurantManager.ManagerName = "";
        this.model.RestaurantManager.Username = "";
        this.model.RestaurantManager.Password = "";
    }

    resetUserModel() {
        this.model.Id = 0;
        this.model.FirstName = "";
        this.model.LastName = "";
        this.model.Gender = "";
        this.model.Birthday = "";
        this.model.PhoneNumber = "";
        this.model.Email = "";
        this.model.City = "";
        this.model.Country = "";
        this.model.Address = "";
        this.model.Username = "";
        this.model.Password = "";
        this.model.ConfirmPassword = "";

        this.model.UserBookings = [];
        this.model.UserFavoriteRestaurnats = [];
        this.model.UserRestaurnatReviews = [];
    }

    // New 04/10/2016
    calculatePercentage(progressCount) {

        var result = 0;
        var progressCountArray = progressCount.split('/');

        if (progressCountArray.length === 2) {
            result = (progressCountArray[0] / progressCountArray[1]);

            result *= 100;
        }

        return +result.toFixed(2);
    }
    //#endregion

    configureAttached() {
        // Automagically scroll page to top
        this.scrollToTop();

        // Fix height inconcistencies between navbar and page content/footer
        let navbarHeight = $('.navbar-static-side').height();
        let greyHeight = $('.gray-hsd-bg').height();
        if (greyHeight < navbarHeight) {
            $('.pageButtons').css('margin-top', ($('.navbar-static-side').height() - 114) + "px");
        }
    }

    scrollToTop(speed = 'medium') {
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
        $('html, body').animate({
            scrollTop: 0
        }, {
                duration: speed,
            });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // New
    printDuration(startTime) {
        customLog(`Save duration: ${+((performance.now() - startTime) / 1000).toFixed(4)}s.`);
    }

    parseJSONColumn(columnName) {
        //if (typeof this.model[columnName] === "string" || this.model[columnName] instanceof String) {
        //    this.model[columnName] = JSON.parse(this.model[columnName]);
        //}

        if (this.model[columnName]) {
            this.model[columnName] = JSON.parse(this.model[columnName]);
        }
    }

    newTabToRelatedProcess(list, id) {
        let url = `#/${list}/${id}/`;
        window.open(url, '_blank');
    }
}