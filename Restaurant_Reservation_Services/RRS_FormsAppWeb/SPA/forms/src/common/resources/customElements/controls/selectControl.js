import { bindable, inject } from "aurelia-framework";
import { log, customLog } from 'common/resources/scripts/log';
import { trimEndSpaceComma } from 'common/resources/scripts/helper';
import 'selectize';

@inject(Element)
export class SelectControl {
    @bindable elementId;
    @bindable elementName;
    @bindable spColumn;
    @bindable optionsList;
    @bindable placeholder;
    @bindable isDisabled;
    @bindable isMulti;
    @bindable isStyles;
    @bindable isAmbience;
    @bindable isAmenities;
    @bindable isPaymentMethods;
    @bindable isCuisine;

    constructor(element) {
        this.$element = $(element);

        this.optionsList = [];

        this.isStyles = false;
        this.isAmbience = false;
        this.isAmenities = false;
        this.isPaymentMethods = false;
        this.isCuisine = false;

        this.placeholder = '';
        this.isMulti = false;
        this.isDisabled = false;
    }

    attached() {
        let _self = this;
        this.spColumn = !this.spColumn ? [] : this.spColumn;

        this.setSelectize();
    }

    setSelectize() {
        let _self = this;
        let element = this.$element.find("#" + this.elementId);

        this.select = element.selectize({
            plugins: ['remove_button'],
            delimiter: ',',
            persist: false,
            valueField: 'Name',
            labelField: 'Description',
            searchField: ['Name', 'Description'],
            sortField: 'Name',
            options: _self.optionsList,
            create: false,
            onItemAdd: function (value, $item) {
                var data = this.options[value];
                if (data) {
                    _self.addObject(data);
                }
            },
            onItemRemove: function (value, $item) {
                var data = this.options[value];
                if (data && data.Name) {
                    _self.removeObject(data);
                }
            },
        });

        this.setSelectedValues();

        if (this.isDisabled) {
            this.select[0].selectize.disable();
        }
    }

    setSelectedValues() {
        this.select[0].selectize.setValue(this.returnSpColumnValues());
    }

    returnSpColumnValues() {
        let _self = this;
        let values = [];
        if (this.spColumn && this.spColumn.length > 0) {
            for (let i = 0; i < this.spColumn.length; i++) {
                if (_self.isStyles) {
                    if (_self.spColumn[i].Style) {
                        values.push(_self.spColumn[i].Style.Name);
                    }
                }
                else if (_self.isAmbience) {
                    if (_self.spColumn[i].Ambience) {
                        values.push(_self.spColumn[i].Ambience.Name);
                    }
                }
                else if (_self.isAmenities) {
                    if (_self.spColumn[i].Amenitie) {
                        values.push(_self.spColumn[i].Amenitie.Name);
                    }
                }
                else if (_self.isPaymentMethods) {
                    if (_self.spColumn[i].PaymentMethod) {
                        values.push(_self.spColumn[i].PaymentMethod.Name);
                    }
                }
                else if (_self.isCuisine) {
                    if (_self.spColumn[i].Cuisine) {
                        values.push(_self.spColumn[i].Cuisine.Name);
                    }
                }
            }
        }
        return values;
    }

    addRemoveClass(hasError = false) {
        var target = $('#' + this.elementId);
        if (target.hasClass("selectElement") && hasError) {
            target.removeClass("selectElement").addClass("selectElementError");
        }
        else if (target.hasClass("selectElementError") && !hasError) {
            target.removeClass("selectElementError").addClass("selectElement");
        }
    }

    addObject(data) {
        let _self = this;
        let object = {};
        let found = false
        for (var i = 0; i < _self.spColumn.length; i++) {
            if (_self.isStyles) {
                if (_self.spColumn[i].Style && _self.spColumn[i].Style.Name == data.Name) {
                    found = true;
                    break;
                }
            }
            else if (_self.isAmbience) {
                if (_self.spColumn[i].Ambience && _self.spColumn[i].Ambience.Name == data.Name) {
                    found = true;
                    break;
                }
            }
            else if (_self.isAmenities) {
                if (_self.spColumn[i].Amenitie && _self.spColumn[i].Amenitie.Name == data.Name) {
                    found = true;
                    break;
                }
            }
            else if (_self.isPaymentMethods) {
                if (_self.spColumn[i].PaymentMethod && _self.spColumn[i].PaymentMethod.Name == data.Name) {
                    found = true;
                    break;
                }
            }
            else if (_self.isCuisine) {
                if (_self.spColumn[i].Cuisine && _self.spColumn[i].Cuisine.Name == data.Name) {
                    found = true;
                    break;
                }
            }
        }
        if (this.isStyles && !found) {
            object.StyleId = data.Id;
            this.spColumn.push(object);
        }
        else if (this.isAmbience && !found) {
            object.Ambience = { "Name": data.Name};
            object.AmbienceId = data.Id;
            this.spColumn.push(object);
        }
        else if (this.isAmenities && !found) {
            object.AmenitieId = data.Id;
            this.spColumn.push(object);
        }
        else if (this.isPaymentMethods && !found) {
            object.PaymentMethodId = data.Id;
            this.spColumn.push(object);
        }
        else if (this.isCuisine && !found) {
            object.CuisineId = data.Id;
            this.spColumn.push(object);
        }
        //customLog(`Select Control- ADD - ${this.elementName}`, this.spColumn, "info");
    }

    removeObject(data) {
        let _self = this;
        for (var i = 0; i < _self.spColumn.length; i++) {
            if (this.isStyles) {
                if (_self.spColumn[i].StyleId === data.Id) {
                    _self.spColumn.splice(i, 1);
                    break;
                }
            }
            else if (this.isAmbience) {
                if (_self.spColumn[i].AmbienceId === data.Id) {
                    _self.spColumn.splice(i, 1);
                    break;
                }
            }
            else if (this.isAmenities) {
                if (_self.spColumn[i].AmenitieId === data.Id) {
                    _self.spColumn.splice(i, 1);
                    break;
                }
            }
            else if (this.isPaymentMethods) {
                if (_self.spColumn[i].PaymentMethodId === data.Id) {
                    _self.spColumn.splice(i, 1);
                    break;
                }
            }
            else if (this.isCuisine) {
                if (_self.spColumn[i].CuisineId === data.Id) {
                    _self.spColumn.splice(i, 1);
                    break;
                }
            }
        }
        //customLog(`Select Control- REMOVE - ${this.elementName}`, this.spColumn, "info");
    }
}