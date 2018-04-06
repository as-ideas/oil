const glob = require('glob');
const asciiDoctor = require('asciidoctor.js')();
const fs = require('fs');
const base_dir = require('path').resolve();

if (!fs.existsSync(base_dir.concat('/dist/docs/'))){
  fs.mkdirSync(base_dir.concat('/dist/docs/'));
}

const BUNDLE_VERSION = process.env.npm_package_version + (process.env.SNAPSHOT || '-SNAPSHOT');

glob('docs/*.adoc', function (err, files) {
  files.forEach(function (file) {
    asciiDoctor.convertFile(file, {
      'to_file': true,
      'header_footer': true,
      'safe': 'unsafe',
      'to_dir': base_dir.concat('/dist/docs/'),
      'base_dir': base_dir.concat('/docs/'),
      'attributes': {
        'version': BUNDLE_VERSION
      }
    });
  });
});










