const glob = require('glob');
const asciiDoctor = require('asciidoctor.js')();
const fs = require('fs');
const base_dir = require('path').resolve();
const Path = require('path');

if (!fs.existsSync(base_dir.concat('/dist/docs/'))) {
  fs.mkdirSync(base_dir.concat('/dist/docs/'));
}

const BUNDLE_VERSION = process.env.npm_package_version + (process.env.SNAPSHOT || '-SNAPSHOT');
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
  return getFilenames(base_dir.concat('/src/scripts/poi-list/lists/'))
    .map((item) => {
      return ('<li>' + item + '</li>').replace('poi-info_', '').replace('.js', '');
    }).join(' ');
}

function getFilenames(path) {
  return fs.readdirSync(path)
    .filter((item) => {
      return fs.statSync(Path.join(path, item)).isFile()
    })
    .sort()
}







