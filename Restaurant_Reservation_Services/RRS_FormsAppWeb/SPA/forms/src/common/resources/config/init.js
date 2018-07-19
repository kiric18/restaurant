import $ from 'jquery';
import { log, customLog } from 'common/resources/scripts/log';
//import 'bootstrap';


export function LoadCurrentUser() {
    customLog('user');
}

export function documentReady() {

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', LoadCurrentUser);
}

// check if browser support HTML5 local storage
export function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}