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
    @bindable panelTitle;
    @bindable inputValue;
    @bindable info;
    @bindable modelId;

    constructor(element, router, appController, dialogService) {
        this.$element = $(element);
        this.router = router;
        this.appController = appController;
        this.dialogService = dialogService;
        this.panelTitle = "Upload Pictures";
        this.info = '';
        this.selectedFiles = [];
        this.uploadedFiles = [];
        this.isLoading = false;
        this.modelId = 0;
    }

    attached() {
        this.modelId = this.modelId ? this.modelId : 0;
        this.getUploadedFiles();
    }

    getUploadedFiles() {
        let _self = this;
        if (this.modelId != 0) {
            this.isLoading = true;
            this.appController.webServices.getImages(this.modelId).then(result => {
                customLog(`response from s getImages("${_self.elementId}"): `, result);

                _self.uploadedFiles = result;

                _self.isLoading = false;
            }).catch(error => {
                customLog("Error from getImages: ", error, "error");
            });
        }
    }

    uploadFiles() {
        let _self = this;

        if (!this.selectedFiles || this.selectedFiles.length == 0) {
            return;
        }

        let message = "Uploading Pictures...";
        this.dialogService.openAndYieldController({ viewModel: Loading, model: message }).then(controller => {

            _self.appController.webServices.uploadImages(_self.selectedFiles, _self.modelId).then(result => {

                // Finally, clear uploaded files list
                _self.getUploadedFiles();
                _self.clearSelectedFiles();

                controller.cancel();
            })
                .catch(error => {

                    customLog("Error from uploadImages(): ", error, "error");
                    controller.cancel();
                });
        });
    }

    clearSelectedFiles() {
        this.selectedFiles = [];
        this.inputValue = "";
    }

    removeImage(index) {
        let _self = this;

        let message = `Removing Picture...`;
        this.dialogService.openAndYieldController({ viewModel: Loading, model: message }).then(controller => {
            _self.appController.webServices.deleteImage(_self.uploadedFiles[index].Id).then(result => {
                customLog("response from removeImage(): ", result);
                _self.uploadedFiles.splice(index, 1);

                controller.cancel();
            })
                .catch(error => {

                    customLog("Error from removeImage(): ", error, "error");
                    controller.cancel();
                });
        });
    }

    showImage(file) {
        var model = { body: '', type: 'success', ImageName: file.ImageName, ImageExtension: file.ImageExtension, ImageBase64: file.ImageBase64 };
        this.appController.popup.popupImage(model);
    }
}