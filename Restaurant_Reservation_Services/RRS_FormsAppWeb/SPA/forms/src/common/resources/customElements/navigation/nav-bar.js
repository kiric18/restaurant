import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'bootstrap';

import { log, customLog } from 'common/resources/scripts/log';
import { AppController } from "common/controllers/appController";
import { Environment } from 'common/resources/config/environment';
import { Popup } from 'common/resources/scripts/popup';

@inject(Router, AppController, Environment, Popup)
export class NavBar {

    constructor(router, appController, environment, popup) {
        this.router = router;
        this.appController = appController;
        this.environment = environment;
        this.popup = popup;
    }

    getURL(routeParam) {
        //if(this.router.currentInstruction.params.id)
        //    this.router.navigateToRoute(routeParam.config.name, { id: this.router.currentInstruction.params.id });
        //else {
        this.router.navigateToRoute(routeParam.config.name);
        //}
    }

    openRelatedRequest() {
        customLog("Navigate to related Request: ", this.appController.RelatedRequestListUrl);
        if (!this.appController.RelatedRequestListUrl) {
            this.popup.popupError("Sorry, you don't have the right permissions to open Related Request.");
            return;
        }
        this.router.navigate(this.appController.RelatedRequestListUrl);
    }

    openRelatedProcess() {
        customLog("Navigate to related Process: ", this.appController.RelatedProcessListUrl);
        if (!this.appController.RelatedProcessListUrl) {
            this.popup.popupError("Sorry, you don't have the right permissions to open the Related Process.");
            return;
        }
        this.router.navigate(this.appController.RelatedProcessListUrl);
    }

    openSubRelatedProcess() {
        customLog("Navigate to related Process: ", this.appController.model.ProcessMetadata.SubRelatedProcessListUrl);
        if (!this.appController.model.ProcessMetadata.SubRelatedProcessListUrl) {
            this.popup.popupError("Sorry, you don't have the right permissions to open the Related Process.");
            return;
        }
        this.router.navigate(this.appController.model.ProcessMetadata.SubRelatedProcessListUrl);
    }

    openDiscussionBoard() {
        //let discussionBoardUrl = this.environment.discussionBoadUrl + this.appController.model.DiscussionBoardUrl + "&IsDlg=1";
        //this.popup.popupUrl(discussionBoardUrl, "Discussion Board", true);
        let discussionBoardUrl = this.environment.discussionBoadUrl + this.appController.model.DiscussionBoardUrl + "_.000" + "&IsDlg=1";
        customLog("Opening Discussion Board: ", discussionBoardUrl);
        this.popup.popupRequestDiscussionBoard();
    }
}