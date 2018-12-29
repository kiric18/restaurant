'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const jspm = require('jspm');
const paths = require('../paths');
const bundles = require('../bundles.js');
const resources = require('../export.js');
var serializer = require("./config-serializer");

function getBundles() {
    let bl = [];
    for (let b in bundles.bundles) {
        //console.log(b);
        bl.push(b + '*.js');
    }
    return bl;
}

function getExportList() {
    return resources.list.concat(getBundles());
}

function normalizeExportPaths() {
    const pathsToNormalize = resources.normalize;

    let promises = pathsToNormalize.map(pathSet => {
        const packageName = pathSet[0];
        const fileList = pathSet[1];

        return jspm.normalize(packageName).then((normalized) => {
            const packagePath = normalized.substring(normalized.indexOf('jspm_packages'), normalized.lastIndexOf('.js'));
            return fileList.map(file => packagePath + file);
        });
    });

    return Promise.all(promises)
        .then((normalizedPaths) => {
            return normalizedPaths.reduce((prev, curr) => prev.concat(curr), []);
        });
}

// deletes all files in the output path
gulp.task('clean-export', function () {
    return gulp.src([paths.exportSrv])
        .pipe(vinylPaths(del));
});

gulp.task('export-copy', function () {
    //console.log(getExportList());
    return gulp.src(getExportList(), { base: '.' })
        .pipe(gulp.dest(paths.exportSrv));
});

gulp.task('export-normalized-resources', function () {
    return normalizeExportPaths().then(normalizedPaths => {
        return gulp.src(normalizedPaths, { base: '.' })
            .pipe(gulp.dest(paths.exportSrv));
    });
});

// update exported configuration file
gulp.task('update-config', function () {
    var appCfg = serializer.getAppConfig(paths.configExport);
    appCfg.transpiler = 'none';
    appCfg.paths['*'] = '/SPA/forms/*';
    delete appCfg.babelOptions;
    //console.log("update-config", appCfg);

    serializer.saveAppConfig(paths.configExport, appCfg);
});

// Need to Replace newer version of system.js 'System.registry.get("@@global-helpers")' with 'System.get("@@global-helpers")' to app-build and vendor-build files.
gulp.task('replace-global-helpers', function () {
    gulp.src(['./export/dist/app-build*.js', './export/dist/vendor-build*.js', './export/dist/plugins-build*.js'])
        .pipe(replace('System.registry.get("@@global-helpers")', 'System.get("@@global-helpers")'))
        .pipe(replace('System.registerDynamic("selectize"', 'System.registerDynamic("common/plugins/selectize"'))
        .pipe(gulp.dest('./export/dist/'));
});

// use after prepare-release
gulp.task('export', function (callback) {
    return runSequence(
        'bundle',
        'clean-export',
        'export-normalized-resources',
        'export-copy',
        'replace-global-helpers',
        'update-config',
        callback
    );
});
