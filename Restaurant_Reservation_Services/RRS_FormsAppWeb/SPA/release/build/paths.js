var appRoot = 'src/';
var assetRoot = 'assets/';
var outputRoot = 'dist/';
var exportSrvRoot = 'export/';
var devRoot = '../../forms/';

module.exports = {
  config : './config.js',
  configDev : devRoot + 'config.js',
  configExport : './export/config.js',
  srcDev:devRoot + 'src/**/*',
  assetDev:devRoot + 'assets/**/*',
  configRoot:'./',
  root: appRoot,
  asset: assetRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'assets/styles/**/*.css',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
