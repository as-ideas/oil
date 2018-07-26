const fs = require('fs-extra');
const Table = require('cli-table');
const gzipme = require('gzipme');

function getFilesInDir(directory) {
  return fs.readdirSync(directory).map(elem => directory + '/' + elem);
}

function filterForScripts(filenames) {
  return filenames.filter((filename) => {
    return (filename.match('\.(min|chunk)\.js$') && filename.match('\.*(SNAPSHOT|RELEASE)\.*js$')) || filename.endsWith('hub.html');
  });
}

function getFilesizesInBytes(filenames, dirname) {
  return filenames.map(filename => {
    const stats = fs.statSync(filename);
    const filesizeInBytes = stats.size;

    const statsGz = fs.statSync(filename + '.gz');
    const filesizeInBytesGz = statsGz.size;
    fs.unlinkSync(filename + '.gz');

    return {
      name: filename,
      size: filesizeInBytes,
      sizeGz: filesizeInBytesGz
    }
  });
}

function saveStatsToFile(dist, stats) {
  fs.writeFileSync(dist, JSON.stringify(stats, null, 4))
  console.log('Saved stats to ' + dist);
}

function printSizesShapely(files) {
  let table = new Table({
    head: ['Filename', 'Size', 'SizeGz'],
    colWidths: [50, 15, 15]
  });

  let totalSize = 0;
  files.forEach(file => {
    let filesizeInKB = Math.round(file.size / 1024 * 1000) / 1000;
    let filesizeGzInKB = Math.round(file.sizeGz / 1024 * 1000) / 1000;

    table.push([file.name, filesizeInKB + ' kB', filesizeGzInKB + ' kB']);
    totalSize += file.size;
  });

  let totalSizeKB = Math.round(totalSize / 1024 * 1000) / 1000;
  table.push(['Total', totalSizeKB + ' kB']);

  console.log(table.toString());
}


const DIR_NAME = 'dist';
const OUTPUT_FILE = 'dist/stats.json';

function gzipEverything(filenames) {
  let counter = 0;
  return new Promise(function (resolve, reject) {
    filenames.forEach(filename => {
      gzipme(filename, false, 'best', () => {
        counter++;
        if (counter >= filenames.length) {
          resolve();
        }
      });
    });
  });
}

function copyScriptsToLatest(filenames) {
  let dir = './dist/latest';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  filenames.forEach(file => {
    let newFile = 'dist/latest/' + (file.replace('dist/', '').replace(/\.1\.[0-9]\.[0-9]\.?-(RELEASE|SNAPSHOT)/gm, ''));
    fs.copySync(file, newFile);

    fs.readFile(newFile, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      let result = data.replace(/\.1\.[0-9]\.[0-9]\.?-(RELEASE|SNAPSHOT)/gm, '');

      fs.writeFile(newFile, result, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  });

}

try {
  let filenames = getFilesInDir(DIR_NAME);
  let scriptnames = filterForScripts(filenames);
  copyScriptsToLatest(scriptnames);
  let promise = gzipEverything(scriptnames);

  promise.then(() => {
    let filesizes = getFilesizesInBytes(scriptnames);

    printSizesShapely(filesizes);
    saveStatsToFile(OUTPUT_FILE, filesizes);
  });
} catch (e) {
  console.error(e.message)
}
