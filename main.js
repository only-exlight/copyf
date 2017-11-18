let rDir = (path, format) => {
    let children = null;
    try {
        children = fs.readdirSync(path);
    } catch (err) {
        errors++;
        console.log('ERROR! Foolder ' + path + ' can not be read!');
        process.exit(1);
    }
    children.forEach(child => {
        if (child.indexOf(format) > 0) {
            filesPaths.push(path + '/' + child);
        } else {
            rDir(path + '/' + child, format);
        }
    })
}

const fs = require('fs'),
    path = require('path'),
    args = process.argv.slice(2);

let filesPaths = [],
    copy = 0,
    errors = 0;

if (!args[0]) {
    console.log('ERROR! Give foolder path for the search!');
    process.exit(1);
} else if (!args[1]) {
    console.log('ERROR! Give foolder path for the copying!');
    process.exit(1);
} else if (!args[2]) {
    console.log('ERROR! Give file format!');
    process.exit(1);
}

console.log('Search files...');

rDir(args[0], args[2]);

console.log('Found ' + filesPaths.length + ' ' + args[2] + ' files.');
console.log('Copying files...');

filesPaths.forEach((path, index) => {
    let file = null;
    try {
        file = fs.readFileSync(path);
    } catch (err) {
        console.log('ERROR! File ' + path + ' can not be read!');
        errors++;
    }
    try {
        fs.writeFileSync(args[1] + '/' + index + args[2], file);
        copy++;
    } catch (err) {
        console.log('ERROR! File ' + path + ' can not be write!');
        errors++;
    }
});

console.log('Done!');
console.log('Сopied ' + copy + ' filse of ' + filesPaths.length + '. I/O errors: ' + errors + '.');