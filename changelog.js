const Changelog = require('generate-changelog');
const Fs        = require('fs');
const changelogFile = "CHANGELOG.md";

return Changelog.generate({patch: true})
  .then(function (changelog) {
    console.info(`start write ${changelogFile}`);
    Fs.writeFileSync(`./${changelogFile}`, changelog);
    console.info(`finish write ${changelogFile}`);
  });
