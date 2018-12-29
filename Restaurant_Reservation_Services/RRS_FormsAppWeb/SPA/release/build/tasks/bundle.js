var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var bundles = require('../bundles.js');

var config = {
    force: true,
    baseURL: '.',
    configPath: './config.js',
	bundles: bundles.bundles
};

gulp.task('bundle', ['pre-bundle'], function () {
    return bundler.bundle(config);
});

gulp.task('unbundle', function() {
  return bundler.unbundle(config);
});