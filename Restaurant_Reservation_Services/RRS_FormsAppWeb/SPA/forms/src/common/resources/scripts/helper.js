import $ from 'jquery';
import 'bootstrap';
import moment from 'moment';

import { log, customLog } from 'common/resources/scripts/log';

export function getAureliaInternalRoute() {
    let section = window.location.href.split("#");
    if (section && section.length > 1) {
        return section[1];
    }
    else {
        return "";
    }
}

export function getAureliaQueryStringParameter(paramToRetrieve) {

    var section = window.location.href.split("#");
    var paramsArray = "";
    if (section.length == 1 || section[1].split("?").length == 1) {
        return "";
    }

    var params = section[1].split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}

export function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return decodeURIComponent(singleParam[1]);
    }
}

export function SetSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function GetSessionStorage(key, clear = false) {
    let result = sessionStorage.getItem(key);
    console.log(`SessionStorage["${key}"]: ${result}`);

    if (!result) {
        return "";
    }

    if (clear) {
        sessionStorage.setItem(key, "");
    }

    return JSON.parse(result);
}

export function isEmpty(str) {
    return (!str || 0 === str.length);
}

export function formatString(b) {
    var a = arguments;
    return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
        if (b.substring(0, 2) == "{{") return b;
        var c = parseInt(b.match(/\d/)[0]);
        return a[c + 1];
    });
}

export function getCurrentHostNameUrl() {
    // IE 10 does doesnt support origin property. Build manually
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    return document.location.origin;
}

// Get http: or https:
export function getProtocolFromUrl() {
    return window.location.protocol;
}

export function getHostNameUrl(url) {
    let returnUrl = url;
    let protocol;
    let protocolIndex = url.indexOf("://");
    //find & remove protocol (http, ftp, etc.) and get domain
    if (protocolIndex > -1) {
        protocol = url.substring(0, protocolIndex + 3);
        returnUrl = url.substring(protocolIndex + 3);
        returnUrl = returnUrl.split('/')[0];
        returnUrl = protocol + returnUrl;
    }
    return returnUrl;
}

export function getFileExtension(str) {
    return str.replace(/^.*?\.([a-zA-Z0-9]+)$/, "$1");
}

export function stripTrailingSlash(str) {
    if (str.endsWith('/')) {
        return str.slice(0, -1);
    }
    return str;
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function parseDMS(column) {
    return column ? JSON.stringify(column) : '';
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ibox() {
    // Collapse ibox function
    $('.collapse-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').click(function () {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });
}

export function tooltip() {
    $('.tooltip-main').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });
}

export function footableFilterStatus() {
    FooTable.MyFiltering = FooTable.Filtering.extend({
        construct: function (instance) {
            this._super(instance);
            this.statuses = ['Active', 'Disabled', 'Suspended'];
            this.def = 'Any Status';
            this.$status = null;
        },
        $create: function () {
            this._super();
            var self = this,
                $form_grp = $('<div/>', { 'class': 'form-group' })
                    .append($('<label/>', { 'class': 'sr-only', text: 'Status' }))
                    .prependTo(self.$form);

            self.$status = $('<select/>', { 'class': 'form-control' })
                .on('change', function () {
                    self.filter();
                })
                .append($('<option/>', { text: self.def }))
                .appendTo($form_grp);

            $.each(self.statuses, function (i, status) {
                self.$status.append($('<option/>').text(status));
            });
        },
        filter: function (query, columns) {
            var val = this.$status.val();
            if (val != this.def) this.addFilter('status', val, ['status']);
            else this.removeFilter('status');
            return this._super(query, columns);
        },
        clear: function () {
            this.$status.val(this.def);
            this.removeFilter('status');
            return this._super();
        }
    });
    //FooTable.components.register('filtering', FooTable.MyFiltering);
    return FooTable.MyFiltering;
}

export function footableFilterGeneric(filterArray, selectAll, filteringField) {
    FooTable.MyFiltering = FooTable.Filtering.extend({
        construct: function (instance) {
            this._super(instance);
            this.statuses = filterArray;
            this.def = selectAll;
            this.$status = null;
        },
        $create: function () {
            this._super();
            var self = this,
                $form_grp = $('<div/>', { 'class': 'form-group' })
                    .append($('<label/>', { 'class': 'sr-only', text: filteringField }))
                    .prependTo(self.$form);

            self.$status = $('<select/>', { 'class': 'form-control' })
                .on('change', function () {
                    self.filter();
                })
                .append($('<option/>', { text: self.def }))
                .appendTo($form_grp);

            $.each(self.statuses, function (i, status) {
                self.$status.append($('<option/>').text(status));
            });
        },
        filter: function (query, columns) {
            var val = this.$status.val();
            if (val != this.def) this.addFilter('status', val, [filteringField]);
            else this.removeFilter('status');
            return this._super(query, columns);
        },
        clear: function () {
            this.$status.val(this.def);
            this.removeFilter('status');
            return this._super();
        }
    });
    //FooTable.components.register('filtering', FooTable.MyFiltering);
    return FooTable.MyFiltering;
}

export function footableUpdateSource(elementName, source) {
    FooTable.get(elementName).loadRows(source);
}

export function gridBalloon() {

    $('.balloon').balloon({
        position: "top",
        delay: 500,
        css: {
            padding: '8px 13px',
            fontSize: '90%',
            fontWeight: 'bold',
            backgroundColor: '#2f2f2f',
            boxShadow: '0px 0px 0px 0px #336699',
            color: '#fff'
        }
    });
}

export function kendoAutoCompleteClients(element, source, ) {
    $(element).kendoAutoComplete({
        dataTextField: "Name",
        filter: "startswith",
        minLength: 4,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            while (_self.clientList.length > 0) {
                _self.clientList.pop();
            }

            let http = new HttpClient();
            http.fetch('http://localhost:46869/api/client/' + dataItem.Id)
                .then(response => response.json())
                .then(httpResponse => {

                    //this.isLoading = false;
                    httpResponse.forEach(item => {

                        if (dataItem.Name == item.Name) {
                            item.isActive = true;
                            _self.client.setClientValues(item);
                        }

                        if (item.ParentId >= 0)
                            _self.clientList.push(item);
                        else
                            _self.clientGroup.setClientValues(item);
                    });
                    _self.updateFootable();
                });
        },
        dataSource:
        {
            dataType: "jsonp",
            serverfiltering: true,
            transport: { read: source }
        }
    });
}

export function footableOptionsGeneric(rows, filter, pageSize) {
    let options = {};

    options = {
        "rows": rows,
        "paging": { "limit": 10, "enabled": true, "size": pageSize ? pageSize : 20, "current": 1, "position": "right" },
        "filtering": { enabled: true },
        "components": { "filtering": filter }
    };

    return options;
}

export function datetimepicker(element, format, steppingMinutes) {

    var result = $('#' + element).datetimepicker({
        format: format,
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-desktop',
            clear: 'fa fa-trash-o',
            close: 'fa fa-times'
        },
        showTodayButton: true,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'bottom'
        },
        stepping: 30,
        ignoreReadonly: true,
        useCurrent: false
    });
    return result;
}

export function closeTab() {

    $("nav").hide();
    $("body").fadeOut(1000, _ => {
        window.open('', '_self', '');
        window.close();
    });
}

export function getInitials(str) {
    var initials = str.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    return initials;
}

export function romanizeNumber(num) {
    var lookup = { m: 1000, cm: 900, d: 500, cd: 400, c: 100, xc: 90, l: 50, xl: 40, x: 10, ix: 9, v: 5, iv: 4, i: 1 }, roman = '', i;
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}

export function trimLastChar(str) {
    if (str.length > 0) {
        return str.substring(0, str.length - 1);
    }

    return str;
}

export function trimEndSpaceComma(str) {
    if (str.length > 0) {
        return str.substring(0, str.length - 2);
    }

    return str;
}

export function trimEndNewLine(str) {
    if (str.length > 0) {
        return str.substring(0, str.length - 2);
    }

    return str;
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function formatCharactersAsBoxes(str) {
    if (str && str.length > 0) {
        return str.split("").join(" | ") + " | ";
    }

    return "|    |    |    |    |    |    |    |    |    |";
}

export function splitStringEvery2Chars(str) {
    //Putting {1,2} instead of 2 so as to return only 1 char if the remainder chars is less than 2
    return str.match(/.{1,2}/g);
}

export function replaceLastCommaWithSpaceAnd(str) {
    if (str.length > 0) {

        var pos = str.lastIndexOf(',');

        if (pos > -1) {
            return str.substring(0, pos) + ' and' + str.substring(pos + 1);
        }
        else {
            return str;
        }
    }

    return str;
}

export function comma() {
    return ', ';
}

export function nbsp() {
    return '\u00A0';
}

export function oneTab() {
    //Tab = 11x nbsp
    let tab = nbsp() + nbsp() + nbsp() + nbsp() + nbsp() + nbsp() + nbsp() + nbsp() + nbsp() + nbsp() + nbsp();
    return tab;
}

export function getNumbersInString(str) {

    return parseInt(str.replace(/\D/g, ''));
}

export function oneNewLine() {
    return '\r\n';
}

export function twoNewLines() {
    return '\r\n' + '\r\n';
}

export function splitEveryCapital(string) {
    return string.split(/(?=[A-Z])/);
}

export function addSpaceBeforeCapital(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function removeStringNumbers(string) {
    return string.replace(/[0-9]/g, '');
}
export function convertNumberIntoWords(amount, currency) {

    function Words999(n999) {
        var words = ''; var Hn = 0; var n99 = 0;

        Hn = Math.floor(n999 / 100);                  // # of hundreds in it

        if (Hn > 0) {                               // if at least one 100

            words = Words99(Hn) + " Hundred";           // one call for hundreds
        }

        n99 = n999 - (Hn * 100);                      // subtract the hundreds.

        words += ((words == '') ? '' : ' ') + Words99(n99); // combine the hundreds with tens & ones.

        return words;
    }

    function Words99(n99) {

        var ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
            "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
            "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

        var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
            "Eighty", "Ninety"];

        var words = ''; var Dn = 0; var Un = 0;

        Dn = Math.floor(n99 / 10);

        Un = n99 % 10;

        if (Dn > 0 || Un > 0) {

            if (Dn < 2) {

                words += ones[Dn * 10 + Un];

            } else {

                words += tens[Dn];
                if (Un > 0) words += "-" + ones[Un];
            }
        }

        return words;
    }

    var negativeAmount = amount.indexOf('-');        // negative amount
    var amount = amount.replace(/-/g, '');

    var t1 = amount;
    var t2 = t1.trim();
    var amtStr = t2.replace(/\./g, '');        // $123.456.789,12 = 123456789.12
    var decimalSeparator = amtStr.indexOf(',');        // position of comma before cents, -ve if it doesn't exist.

    if (decimalSeparator > 0) {

        var dollars = amtStr.slice(0, decimalSeparator);  // 1234.56 = 1234
        var cents = amtStr.slice(decimalSeparator + 1);  // 1234.56 = .56

    } else if (decimalSeparator == 0) {

        dollars = '0';
        cents = amtStr.slice(decimalSeparator + 1);  // 1234.56 = .56

    } else {

        dollars = amtStr.slice(0);         // 1234 = 1234
        cents = '0';
    }

    t1 = '000000000000000' + dollars;  // to extend to trillion, use 15 zeros
    dollars = t1.slice(-15);            // and -15 here.

    var trillion = Number(dollars.substr(0, 3));
    var billions = Number(dollars.substr(3, 3));
    var millions = Number(dollars.substr(6, 3));
    var thousands = Number(dollars.substr(9, 3));
    var hundreds = Number(dollars.substr(12, 3));

    t1 = Words999(trillion); var trW = t1.trim();   // Trillion in words

    t1 = Words999(billions); var bW = t1.trim();   // Billions in words

    t1 = Words999(millions); var mW = t1.trim();   // Millions in words

    t1 = Words999(thousands); var tW = t1.trim();   // Thousands in words

    t1 = Words999(hundreds); var hW = t1.trim();   // Hundreds in words

    t1 = Words99(cents); var cW = t1.trim();   // Cents in words

    var totAmt = '';

    if (negativeAmount == 0) totAmt = 'Negative';
    if (trW != '') totAmt += ((totAmt != '') ? ' ' : '') + trW + ' Trillion';
    if (bW != '') totAmt += ((totAmt != '') ? ' ' : '') + bW + ' Billion';
    if (mW != '') totAmt += ((totAmt != '') ? ' ' : '') + mW + ' Million';
    if (tW != '') totAmt += ((totAmt != '') ? ' ' : '') + tW + ' Thousand';
    if (hW != '') totAmt += ((totAmt != '') ? ' ' : '') + hW;
    if (currency && currency != '' && totAmt != '') totAmt += ((totAmt != '') ? ' ' : '') + currency;
    if (cents != '' && cents != 0) totAmt += ((totAmt != '') ? ' and ' : '') + cents + '/100';

    return totAmt;
}

export function convertToCurrencyFormat(amount) {
    let decimalSeparator = ",";
    let thousandsSeparator = ".";
    let decimalAmount = '';
    let result = amount;

    if (amount) {
        //remove thousands separators
        var amtStr = amount.replace(/\./g, '');        // $123.456.789,12 = 123456789,12
        let integerAmount = amtStr;

        //Get decimal Separator Index
        let decimalSeparatorIndex = amtStr.lastIndexOf(decimalSeparator);
        if (decimalSeparatorIndex && decimalSeparatorIndex > 0) {
            //Get integer amount before decimal separator
            integerAmount = amtStr.substring(0, decimalSeparatorIndex);

            decimalAmount = amtStr.substring(decimalSeparatorIndex + 1, amtStr.length);
            if (decimalAmount && decimalAmount.length > 2) {
                decimalAmount = decimalAmount.substring(0, 2);
            }
        }
        //Set thousands separators
        let integerAmountText = integerAmount.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        integerAmountText = integerAmountText.replace(/^[0|\D]*/, '');
        //Set result
        if (decimalAmount.length > 0) {
            result = `${integerAmountText}${decimalSeparator}${decimalAmount}`;
        }
        else {
            result = integerAmountText;
        }
    }
    return result;
}

export function englishToGreekMonth(monthNumber, endsOU = false) {
    let month = '';
    switch (monthNumber) {
        case 1:
            if (endsOU) {
                month = 'Ιανουαρίου';
            }
            else {
                month = 'Ιανουάριος';
            }
            break;
        case 2:
            if (endsOU) {
                month = 'Φεβρουαρίου';
            }
            else {
                month = 'Φεβρουάριος';
            }
            break;
        case 3:
            if (endsOU) {
                month = 'Μαρτίου';
            }
            else {
                month = 'Μάρτιος';
            }
            break;
        case 4:
            if (endsOU) {
                month = 'Απριλίου';
            }
            else {
                month = 'Απρίλιος';
            }
            break;
        case 5:
            if (endsOU) {
                month = 'Μαΐου';
            }
            else {
                month = 'Μάιος';
            }
            break;
        case 6:
            if (endsOU) {
                month = 'Ιουνίου';
            }
            else {
                month = 'Ιούνιος';
            }
            break;
        case 7:
            if (endsOU) {
                month = 'Ιουλίου';
            }
            else {
                month = 'Ιούλιος';
            }
            break;
        case 8:
            if (endsOU) {
                month = 'Αυγούστου';
            }
            else {
                month = 'Αύγουστος';
            }
            break;
        case 9:
            if (endsOU) {
                month = 'Σεπτεμβρίου';
            }
            else {
                month = 'Σεπτέμβριος';
            }
            break;
        case 10:
            if (endsOU) {
                month = 'Οκτωβρίου';
            }
            else {
                month = 'Οκτώβριος';
            }
            break;
        case 11:
            if (endsOU) {
                month = 'Νοεμβρίου';
            }
            else {
                month = 'Νοέμβριος';
            }
            break;
        case 12:
            if (endsOU) {
                month = 'Δεκεμβρίου';
            }
            else {
                month = 'Δεκέμβριος';
            }
            break;
    }
    return month;
}

export function formatDateToSharepoint(valueIn) {
    let dateFormat = 'DD/MM/YYYY';
    let sharePointdateFormat = 'YYYY-MM-DD';

    if (moment(valueIn, sharePointdateFormat).format(sharePointdateFormat) === valueIn) {
        return valueIn;
    }
    let result = (valueIn) ? moment(valueIn, dateFormat).format(sharePointdateFormat) : "";
    return result;
}

export function formatDateAndTimeToSharepoint(valueIn) {
    let dateFormat = 'DD/MM/YYYY HH:mm';
    let sharePointdateFormat = 'YYYY-MM-DD HH:mm';

    if (moment(valueIn, sharePointdateFormat).format(sharePointdateFormat) === valueIn) {
        return valueIn;
    }
    let result = (valueIn) ? moment(valueIn, dateFormat).format(sharePointdateFormat) : "";
    return result;
}

export function setMaxDate($element, elementId, date) {
    let dateFormat = 'DD/MM/YYYY';
    let momentDateFormat = 'YYYY-MM-DD';
    $element.find(elementId).data("DateTimePicker").maxDate(moment(date, momentDateFormat).format(dateFormat));
}

export function setMinDate($element, elementId, date) {
    let dateFormat = 'DD/MM/YYYY';
    let momentDateFormat = 'YYYY-MM-DD';
    $element.find(elementId).data("DateTimePicker").minDate(moment(date, momentDateFormat).format(dateFormat));
}

export function setMaxDateAndTime($element, elementId, date) {
    let dateFormat = 'DD/MM/YYYY HH:mm';
    let momentDateFormat = 'YYYY-MM-DD HH:mm';
    $element.find(elementId).data("DateTimePicker").maxDate(moment(date, momentDateFormat).format(dateFormat));
}

export function setMinDateAndTime($element, elementId, date) {
    let dateFormat = 'DD/MM/YYYY HH:mm';
    let momentDateFormat = 'YYYY-MM-DD HH:mm';
    $element.find(elementId).data("DateTimePicker").minDate(moment(date, momentDateFormat).format(dateFormat));
}

export function setMaxTime($element, elementId, date) {
    let timeFormat = 'HH:mm';
    let momentTimeFormat = 'HH:mm';
    $element.find(elementId).data("DateTimePicker").maxDate(moment(date, momentTimeFormat).format(timeFormat));
}

export function setMinTime($element, elementId, date) {
    let timeFormat = 'HH:mm';
    let momentTimeFormat = 'HH:mm';
    $element.find(elementId).data("DateTimePicker").minDate(moment(date, momentTimeFormat).format(timeFormat));
}
export function checkDateIfIsInWeekend(dateTo, plusDays) {
    let dateFormat = 'DD/MM/YYYY';
    let date = moment(dateTo, dateFormat);
    let day = moment(date).isoWeekday(date.day()).format("dddd");

    if (day == 'Saturday') {
        date = moment(date).add(plusDays ? 2 : -1, 'days');
    }
    else if (day == 'Sunday') {
        date = moment(date).add(plusDays ? 1 : -2, 'days');
    }

    return date;
}

export function dateIsAfterThan(dateTo, dateFrom) {
    return moment(dateTo).isAfter(dateFrom);
}

export function dateIsSameThan(dateTo, dateFrom) {
    return moment(dateTo).isSame(dateFrom);
}

export function dateIsBeforeThan(dateTo, dateFrom) {
    return moment(dateTo).isBefore(dateFrom);
}

export function dateIsSameOrBefore(dateTo, dateFrom) {
    return moment(dateTo).isSameOrBefore(dateFrom);
}

export function dateIsSameOrAfter(dateTo, dateFrom) {
    return moment(dateTo).isSameOrAfter(dateFrom);
}

export function currentDateAndTime() {
    let dateFormat = 'DD/MM/YYYY HH:mm';
    return moment().format(dateFormat);
}

export function currentDate() {
    let dateFormat = 'DD/MM/YYYY';
    return moment().format(dateFormat);
}

export function currentTime() {
    let dateFormat = 'HH:mm:ss';
    return moment().format(dateFormat);
}

export function addDayMonthYearToSpecificDate(specificDate, dayMonthYear, numberToAdd) {
    let dateFormat = 'YYYY-MM-DD';
    let date = moment(specificDate).add(dayMonthYear, numberToAdd).format(dateFormat);
    return date;
}
