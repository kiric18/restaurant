import toastr from 'toastr';
import { inject } from 'aurelia-framework';

export class Toast {
    constructor(){
        //check toastr options at http://codeseven.github.io/toastr/demo.html

        /*Optionally override the hide animation when the close button is clicked (falls back to hide configuration).*/
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';

        //Rather than having identical toasts stack, set the preventDuplicates property to true. Duplicates are matched to the previous toast based on their message content.
        toastr.options.preventDuplicates = false;

        //Visually indicate how long before a toast expires.
        toastr.options.progressBar = false;

        //Flip the toastr to be displayed properly for right-to-left languages.
        toastr.options.rtl = true;

        //Show newest toast at bottom (top is default)
        toastr.options.newestOnTop = false;

        toastr.options = {
            tapToDismiss: true,
            toastClass: 'toast',
            containerId: 'toast-container',
            debug: false,
            fadeIn: 300,
            fadeOut: 1000,
            extendedTimeOut: 1000,
            iconClass: 'toast-info',
            positionClass: 'toast-bottom-right',
            timeOut: 5000, // Set timeOut to 0 to make it sticky
            titleClass: 'toast-title',
            messageClass: 'toast-message'
        }
    }

    toastInfo(message, position = 'toast-bottom-right', hasCloseButton = false){
        toastr.options.closeButton = hasCloseButton;
        toastr.options.positionClass = position;
        toastr.info(message);
    }

    toastWarning(message, position = 'toast-bottom-right', hasCloseButton = false){
        toastr.options.closeButton = hasCloseButton;
        toastr.options.positionClass = position;
        toastr.warning(message);
    }

    toastError(message, position = 'toast-bottom-right', hasCloseButton = false) {
        toastr.options.closeButton = hasCloseButton;
        toastr.options.positionClass = position;
        toastr.error(message);
    }

    toastSuccess(message, position = 'toast-bottom-right', hasCloseButton = false){
        toastr.options.closeButton = hasCloseButton;
        toastr.options.positionClass = position;
        toastr.success(message);
    }

    //toastConfirm(message, hasCloseButton = true) {
    //    toastr.options.closeButton = hasCloseButton;
    //    toastr.options.positionClass = "toast-top-center";
    //    //<br /> <br /> <button type="button" class="btn clear">Yes</button> <button type="button" class="btn clear">No</button>
    //    toastr.info(`${message}<br /> <br /> <button type="button" class="btn clear">Yes</button> <button type="button" class="btn clear">No</button>`, {
    //        onOk: () => {
    //            console.log('ok')
    //        },
    //        onCancel: () => {
    //            console.log('cancel')
    //        },
    //        onTap: function () {
    //            alert("You Clicked Toastr!!")
    //        }
    //    });
    //}

    toast(message, type = "info", hasCloseButton = false){
        switch (type){
            case "success":{ this.toastSuccess(message, hasCloseButton);}break;
            case "warning":{ this.toastWarning(message, hasCloseButton);}break;
            case "error":{ this.toastError(message, hasCloseButton);}break;
            case "info":{ this.toastInfo(message, hasCloseButton);}break;
        }
    }
}