module.exports = {
    "bundles": {
        "dist/app-build": {
            includes: [
                "[app.js]",
                "[app.html!text]",
                "[main.js]",
                "[*/**/*.js]",
                "*/**/*.html!text",
                "*/**/*.css!text"
            ],
            excludes: [
                '[rrs/**/*.js]',
                '[rrs/**/*.html!text]',
                '[rrs/**/*.css!text]',
                '[common/plugins/**/*.js]',
                '[common/plugins/**/*.html!text]',
                '[common/plugins/**/*.css!text]'
            ],
            options: {
                inject: true,
                minify: false,
                depcache: true,
                rev: true
            }
        },
        //"dist/plugins-build": {
        //    includes: [
        //        '[common/plugins/**/*.js]',
        //        '[common/plugins/**/*.html!text]',
        //        '[common/plugins/**/*.css!text]'
        //    ],
        //    options: {
        //        inject: true,
        //        minify: true,
        //        depcache: true,
        //        rev: true
        //    }
        //},
        "dist/admin-build": {
            includes: [
                '[rrs/admin/**/*.js]',
                '[rrs/admin/**/*.html!text]',
                '[rrs/admin/**/*.css!text]'
            ],
            options: {
                inject: true,
                minify: false,
                depcache: true,
                rev: true
            }
        },
        "dist/restaurant-build": {
            includes: [
                '[rrs/restaurant/**/*.js]',
                '[rrs/restaurant/**/*.html!text]',
                '[rrs/restaurant/**/*.css!text]'
            ],

            options: {
                inject: true,
                minify: false,
                depcache: true,
                rev: true
            }
        },
        "dist/user-build": {
            includes: [
                '[rrs/user/**/*.js]',
                '[rrs/user/**/*.html!text]',
                '[rrs/user/**/*.css!text]'
            ],
            options: {
                inject: true,
                minify: false,
                depcache: true,
                rev: true
            }
        },
        "dist/vendor-build": {
            includes: [
                //'[common/plugins/**/*.js]',
                //'[common/plugins/**/*.html!text]',
                //'[common/plugins/**/*.css!text]',
                'aurelia-bootstrapper',
                'aurelia-dialog',
                'aurelia-event-aggregator',
                'aurelia-fetch-client',
                'aurelia-framework',
                "aurelia-history-browser",
                'aurelia-loader-default',
                "aurelia-logging-console",
                'aurelia-pal-browser',
                "aurelia-templating-binding",
                "aurelia-templating-resources",
                "aurelia-templating-router",
                'babel',
                './jspm_packages/npm/babel-runtime@5.8.38/helpers/class-call-check.js',
                './jspm_packages/npm/babel-runtime@5.8.38/helpers/create-class.js',
                './jspm_packages/npm/babel-runtime@5.8.38/helpers/define-decorated-property-descriptor.js',
                './jspm_packages/npm/babel-runtime@5.8.38/helpers/create-decorated-class.js',
                './jspm_packages/npm/babel-runtime@5.8.38/core-js/object/define-property.js',
                './jspm_packages/npm/babel-runtime@5.8.38/core-js/promise.js',
                'bootstrap',
                'core-js',
                'fetch',
                'font-awesome',
                'jquery',
                'jquery-ui',
                'ladda',
                'metismenu',
                'moment',
                'text',
                'toastr',
                'whatwg-fetch',
                //'./jspm_packages/npm/jquery-ui@1.12.1/themes/base/all.css!text',
                //'./jspm_packages/npm/font-awesome@4.7.0/css/font-awesome.min.css!text',
                //'./jspm_packages/github/twbs/bootstrap@3.3.7/css/bootstrap.css!text',
            ],
            options: {
                inject: true,
                minify: true,
                depcache: true,
                rev: true
            }
        }
    }
};