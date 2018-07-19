import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { bindable } from "aurelia-framework";
import { DialogService } from 'aurelia-dialog';

import $ from 'jquery';
import { AppController } from "common/controllers/appController";
import { log, customLog } from 'common/resources/scripts/log';
import { Loading } from 'common/resources/customElements/dialogs/loading';
import { cookFV } from 'common/resources/scripts/formValidator';
import { getAureliaInternalRoute } from "common/resources/scripts/helper";

@inject(Element, Router, AppController, DialogService)
export class UploadPictures {
    @bindable elementId;
    @bindable tooltipId;
    @bindable elementName;
    @bindable multiSelect;
    @bindable panelTitle;
    @bindable inputValue;
    @bindable callbackFunction;
    @bindable info;

    constructor(element, router, appController, dialogService) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.dialogService = dialogService;
        this.panelTitle = "Upload Pictures";
        this.info = '';
        this.selectedFiles = [];
        this.uploadedFiles = [];
    }

    attached() {
        //this.getUploadedFiles();
        //this.initializeValidation("attachmentElement");
    }

    getUploadedFiles() {
        //let _self = this;
        //getAttachments(documentListName, attachmentsGroupName, itemId)
        //if (this.appController.model.ID != 0) {
        //    //this.sharepoint.getAttachments(this.appController.ListFullName, this.elementId, this.appController.model.ID).then(result => {
        //    //    customLog(`response from sharepoint.getAttachments("${_self.elementId}"): `, result);

        //    //    _self.uploadedFiles = result;

        //    //    //Reset validator once files are uploaded
        //    //    if (_self.uploadedFiles.length > 0) {
        //    //        _self.fv.enableFieldValidators('elementName', false);
        //    //    }
        //    //})
        //    //.catch(error => {
        //    //    customLog("Error from sharepoint.getAttachments(): ", error, "error");
        //    //    _self.error.addError(`Error while getting attachment. Correlation ID: '${error.CorrelationId}'`, false, 'getUploadedFiles()', 'attachments.js', null);
        //    //});
        //}
    }

    uploadSelectedFiles() {

        //if (!this.selectedFiles || this.selectedFiles.length == 0) {
        //    return;
        //}

        //let _self = this;

        //// New
        //// Save item if model.ID == 0
        //if (this.appController.model.ID == 0) { // New Item
        //    //this.sharepoint.saveItem().then(_ => {

        //    //    // Navigate to valid ID
        //    //    _self.router.navigate(getAureliaInternalRoute().replace("/0/", `/${_self.appController.model.ID}/`));

        //    //    // Finally, upload files
        //    //    _self.uploadFiles();
        //    //});
        //}
        //else {
        //    _self.uploadFiles();
        //}
    }

    confirmDeletion(selectedFunction, index = 0) {
        //let _self = this;

        //this.popup.popupQuestion(selectedFunction == 'clearAll' ? 'Are you sure you want to clear all files?' : 'Are you sure you want to delete the selected file?').then(result => {
        //    if (result.wasCancelled) {
        //        //do nothing
        //    }
        //    else {
        //        if (selectedFunction == 'clearAll') {
        //            _self.clearAllAttachments();
        //        }
        //        else if (selectedFunction == 'singleFile'){
        //            _self.removeItem(index);
        //        }
        //    }
        //});
    }

    clearAllAttachments() {

        //let _self = this;
        //let attachmentsCount = this.uploadedFiles.length;

        //let message = `Removing attached files from SharePoint...`;
        //this.dialogService.openAndYieldController({ viewModel: Loading, model: message }).then(controller => {

        //    this.uploadedFiles.forEach(file => {

        //        //_self.sharepoint.deleteAttachment(_self.appController.ListFullName, _self.appController.model.ID, file.FileName).then(result => {
        //        //    customLog("response from sharepoint.deleteAttachment(): ", result);

        //        //    controller.viewModel.message = `File '${file.FileName}' deleted`;

        //        //    attachmentsCount--;

        //        //    if (attachmentsCount == 0) {
        //        //        _self.appController.sleep(1500).then(_ => {
        //        //            controller.cancel();
        //        //            _self.uploadedFiles.splice(0, _self.uploadedFiles.length);
        //        //        });
        //        //    }
        //        //})
        //        //.catch(error => {

        //        //    customLog("Error from sharepoint.deleteAttachment(): ", error, "error");

        //        //    attachmentsCount--;

        //        //    if (attachmentsCount == 0) {
        //        //        _self.appController.sleep(1500).then(_ => {
        //        //            controller.cancel();
        //        //            _self.uploadedFiles.splice(0, _self.uploadedFiles.length);
        //        //        });
        //        //    }
        //        //});
        //    });
        //});
    }

    uploadFiles() {
        let _self = this;

        //let message = "Uploading selected files to SharePoint...";
        //this.dialogService.openAndYieldController({ viewModel: Loading, model: message }).then(controller => {

        //    ////addAttachments(files, documentListName, attachmentsGroupName, itemId)
        //    //this.sharepoint.addAttachments(_self.selectedFiles, _self.appController.ListFullName, _self.elementId, _self.appController.model.ID).then(result => {

        //    //    customLog("Response from sharepoint.addAttachments(): ", result);

        //    //    // New
        //    //    if (_self.callbackFunction) {

        //    //        var args = {
        //    //            selectedFiles: _self.selectedFiles
        //    //        }

        //    //        _self.callbackFunction(args);
        //    //    }

        //    //    // Finally, clear uploaded files list
        //    //    _self.getUploadedFiles();
        //    //    _self.clearSelectedFiles();

        //    //    controller.cancel();
        //    //})
        //    //.catch(error => {

        //    //    customLog("Error from sharepoint.addAttachments(): ", error, "error");
        //    //    controller.cancel();
        //    });
        //});
    }

    clearSelectedFiles() {
        //this.selectedFiles.splice(index, 1); // SOS: FileList doesn't support the method splice()
        this.inputValue = "";
    }

    removeItem(index) {
        //let _self = this;

        //let message = `Removing '${_self.uploadedFiles[index].FileName}' from SharePoint...`;
        //this.dialogService.openAndYieldController({ viewModel: Loading, model: message }).then(controller => {

        //    ////deleteAttachment(documentListName, itemId, fileName)
        //    //_self.sharepoint.deleteAttachment(_self.appController.ListFullName, _self.appController.model.ID, _self.uploadedFiles[index].FileName).then(result => {
        //    //    customLog("response from sharepoint.deleteAttachment(): ", result);
        //    //    _self.uploadedFiles.splice(index, 1);

        //    //    controller.cancel();
        //    //})
        //    //.catch(error => {

        //    //    customLog("Error from sharepoint.deleteAttachment(): ", error, "error");
        //    //    controller.cancel();
        //    //});
        //});
    }

    initializeValidation(formId) { //pass in form element id
        //let _self = this;
        //this.valFields = {
        //    //elementName: {
        //    //    enabled: false,
        //    //    validators: {
        //    //        callback: {
        //    //            message: "Attachment is required",
        //    //            callback: function (value, validator, $field) {
        //    //                if (_self.uploadedFiles.length == 0) {
        //    //                    return false;
        //    //                }
        //    //                return true;
        //    //            }
        //    //        }
        //    //    }
        //    //}
        //};

        //this.fv = cookFV(this.valFields, this.$element, formId);
    }

    enableFieldValidators(doEnable = true) {
       // this.fv.enableFieldValidators('elementName', doEnable);
    }
}