import { inject } from "aurelia-framework";
import { Environment } from "common/resources/config/environment";

@inject(Environment)
export class stringToIconValueConverter {
    constructor(environment) {
        this.environment = environment;
    }

    toView(value) {
        if (!value) {
            return;
        }
        else {
            var result;
            switch (value) {
                case "DMSLink": {
                    result = "<i title='DMS Link' class='fa fa-link'></i>";
                    break;
                }
                case "SPDocument": {
                    result = "<i title='Sharepoint Document' class='fa fa-file-text-o'></i>";
                    break;
                }
                case "Attachment": {
                    //result = "<i title='Attachment' class='fa fa-paperclip'></i>";
                    result = "<i title='Attachment' class='fa fa-thumb-tack'></i>";
                    break;
                }
                case "Word": {
                    result = `<img src="${this.environment.appUrl}/SPA/workflowforms/assets/images/DocumentFormat/word.png" alt="Word" />`;
                    break;
                }
                case "Excel": {
                    result = `<img src="${this.environment.appUrl}/SPA/workflowforms/assets/images/DocumentFormat/excel.png" alt="Excel" />`;
                    break;
            }
                case "PowerPoint": {
                    result = `<img src="${this.environment.appUrl}/SPA/workflowforms/assets/images/DocumentFormat/powerpoint.png" alt="PowerPoint" />`;
                    break;
                }
                case "PDF": {
                    result = `<img src="${this.environment.appUrl}/SPA/workflowforms/assets/images/DocumentFormat/PDF.png" alt="PDF" />`;
                    break;
                }
                default: {
                    result = `<img src="${this.environment.appUrl}/SPA/workflowforms/assets/images/DocumentFormat/other.png" alt="Other" />`;
                    break;
                }
            }
            return result;
        }
    }
}