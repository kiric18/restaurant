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
export class UploadImg {
    @bindable elementId;
    @bindable imgName;
    @bindable imgExtension;
    @bindable imgBase;
    @bindable elementName;
    @bindable modelId;

    constructor(element, router, appController, dialogService) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.dialogService = dialogService;
        this.selectedFiles = [];
        this.uploadedFiles = [];
        this.isLoading = false;
    }

    attached() {
        //this.getUploadedFiles();
    }

    getUploadedFiles() {
        let _self = this;
        if (this.modelId != 0) {
            this.isLoading = true;
            this.appController.webServices.getRestaurantTableImage(this.modelId).then(result => {
                customLog(`response from s getRestaurantTableImage("${_self.elementId}"): `, result);
                _self.uploadedFiles = result;
                _self.isLoading = false;
            }).catch(error => {
                customLog("Error from getRestaurantTableImage: ", error, "error");
            });
        }
        else {
            this.isLoading = false;
        }
    }

    uploadFiles() {
        let _self = this;

        if (!this.selectedFiles || this.selectedFiles.length == 0) {
            return;
        }
        this.isLoading = true;
        this.appController.webServices.uploadRestaurantTableImage(this.selectedFiles, this.modelId).then(result => {

            _self.imgName = result.FileName;
            _self.imgExtension = result.FileExtension;
            _self.imgBase = result.FileBase64;

            // Finally, clear uploaded files list
            //_self.getUploadedFiles();
            _self.clearSelectedFiles();
            _self.isLoading = false;
        }).catch(error => {
            customLog("Error from uploadImages(): ", error, "error");
            _self.isLoading = false;
        });
    }

    clearSelectedFiles() {
        this.selectedFiles = [];
        this.inputValue = "";
    }

    removeImage(index) {
        let _self = this;
        this.isLoading = true;

        this.appController.webServices.deleteRestaurantTableImage(this.modelId).then(result => {
            customLog("response from removeImage(): ", result);
            _self.imgName = result.FileName;
            _self.imgExtension = result.FileExtension;
            _self.imgBase = result.FileBase64;
            _self.isLoading = false;

        }).catch(error => {
            customLog("Error from removeImage(): ", error, "error");
            _self.isLoading = false;
        });
    }

    showImage(file) {
        var model = { body: '', type: 'success', ImageName: this.imgName, ImageExtension: this.imgExtension, ImageBase64: this.imgBase };
        this.appController.popup.popupImage(model);
    }
}