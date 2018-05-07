const fs = require('fs');
var Table = require('cli-table');

function getFilesInDir(directory) {
    return fs.readdirSync(directory).map(elem => directory + '/' + elem);
}

function filterForScripts(filenames) {
    return filenames.filter((filename) => {
        return filename.match('\.(min|chunk)\.js$');
    });
}

function getFilesizesInBytes(filenames, dirname) {
    return filenames.map(filename => {
        const stats = fs.statSync(filename);
        const filesizeInBytes = stats.size;

        return {
            name: filename,
            size: filesizeInBytes
        }
    });
}

function saveStatsToFile(dist, stats) {
    fs.writeFileSync(dist, JSON.stringify(stats, null, 4))
    console.log('Saved stats to ' + dist);
}

function printSizesShapely(files) {
    var table = new Table({
        head: ['Filename', 'Size'],
        colWidths: [50, 15]
    });

    let totalSize = 0;
    files.forEach(file => {
        let filesizeInKB = Math.round(file.size / 1024 * 1000) / 1000;

        table.push([file.name, filesizeInKB + ' kB']);
        totalSize += file.size;
    });

    let totalSizeKB = Math.round(totalSize / 1024 * 1000) / 1000;
    table.push(['Total', totalSizeKB + ' kB']);

    console.log(table.toString());
}




const DIR_NAME = 'dist';
const OUTPUT_FILE = 'dist/stats.json'

try {
    let filenames = getFilesInDir(DIR_NAME)
    let scriptnames = filterForScripts(filenames);
    let filesizes = getFilesizesInBytes(scriptnames)

    printSizesShapely(filesizes);
    saveStatsToFile(OUTPUT_FILE, filesizes);
} catch (e) { console.error(e.message) }