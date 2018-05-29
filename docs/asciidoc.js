const glob = require('glob');
const asciiDoctor = require('asciidoctor.js')();
const fs = require('fs-extra');
const base_dir = require('path').resolve();
const Path = require('path');

fs.ensureDirSync(base_dir.concat('/dist/docs/'));

fs.copySync(base_dir.concat('/docs/last-release'), base_dir.concat('/dist/docs/last-release'));

const BUNDLE_VERSION = process.env.npm_package_version + (process.env.SNAPSHOT || '-SNAPSHOT');
const BUNDLE_VERSION_RAW = process.env.npm_package_version;
const SUPPORTED_LANGUAGE = getSupportedLanguagesFromDir();
const SUPPORTED_POI_GROUPS = getSupportedPoiGroupsFromDir();

glob('docs/*.adoc', function (err, files) {
  files.forEach(function (file) {
    asciiDoctor.convertFile(file, {
      'to_file': true,
      'header_footer': true,
      'safe': 'unsafe',
      'to_dir': base_dir.concat('/dist/docs/'),
      'base_dir': base_dir.concat('/docs/'),
      'attributes': {
        'version': BUNDLE_VERSION,
        'version_raw': BUNDLE_VERSION_RAW,
        'SUPPORTED_LANGUAGE': SUPPORTED_LANGUAGE,
        'SUPPORTED_POI_GROUPS': SUPPORTED_POI_GROUPS
      }
    });
  });
});

function getSupportedLanguagesFromDir() {
  return getFilenames(base_dir.concat('/src/scripts/userview/locale/'))
    .map((item) => {
      return ('<li>' + item + '</li>').replace('userview_oil_', '').replace('.js', '');
    }).join(' ');
}

function getSupportedPoiGroupsFromDir() {
  return getFilenames(base_dir.concat('/src/poi-lists/'))
    .map((item) => {
      return ('<li>' + item + '</li>').replace('.json', '').replace('.js', '');
    }).join(' ');
}

function getFilenames(path) {
  return fs.readdirSync(path)
    .filter((item) => {
      return fs.statSync(Path.join(path, item)).isFile()
    })
    .sort()
}







