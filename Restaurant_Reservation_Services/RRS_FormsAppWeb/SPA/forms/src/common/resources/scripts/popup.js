import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { PopupDialog } from 'common/resources/customElements/dialogs/popupDialog';
import { UrlDialog } from 'common/resources/customElements/dialogs/urlDialog';

@inject(DialogService)
export class Popup {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    popup(type, title, body, showOkButton = true, showCancelButton = false, showYesButton = false, showNoButton = false) {
        $('.btn').blur();
        var model = { title: title, body: body, type: type, hasOkButton: showOkButton, hasCancelButton: showCancelButton, hasYesButton: showYesButton, hasNoButton: showNoButton };
        this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupError(body, title = '') { //adding default validation error as most commonly used
        $('.btn').blur();
        var model = { title: title, body: body, type: 'error', hasOkButton: true, hasCancelButton: false, hasYesButton: false, hasNoButton: false };
        return this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupCritical(body, title = '') {
        $('.btn').blur();
        var model = { title: title, body: body, type: 'critical', hasOkButton: true, hasCancelButton: false, hasYesButton: false, hasNoButton: false };
        return this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupWarning(body, title = '') {
        $('.btn').blur();
        var model = { title: title, body: body, type: 'warning', hasOkButton: true, hasCancelButton: false, hasYesButton: false, hasNoButton: false };
        return this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupInfo(body, title = '') {
        $('.btn').blur();
        var model = { title: title, body: body, type: 'info', hasOkButton: true, hasCancelButton: false, hasYesButton: false, hasNoButton: false };
        return this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupSuccess(body, title = '') {
        $('.btn').blur();
        var model = { title: title, body: body, type: 'success', hasOkButton: true, hasCancelButton: false, hasYesButton: false, hasNoButton: false };
        return this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupQuestion(body, title = '') {
        $('.btn').blur();
        var model = { title: title, body: body, type: 'question', hasOkButton: false, hasCancelButton: false, hasYesButton: true, hasNoButton: true };
        return this.dialogService.open({ viewModel: PopupDialog, model: model });
    }

    popupUrl(url, title = '', newTab = false) {
        $('.btn').blur();
        if (newTab) {
            //window.open(url, '_blank');
            window.open(url, "_blank", "height=600, width=800,status=0,toolbar=0,menubar=0,location=no,modal=1,dialog=yes,top=100,left=100");
        }
        else {
            var model = { title: title, url: url };
            return this.dialogService.open({ viewModel: UrlDialog, model: model });
        }
    }
}
