const fs = require('fs');
const refresh_data = require('./refresh_data');

const read_code = (url, path, code, callback) => {
    console.log(path)
    if (!fs.existsSync(path)){
        console.log("File not found!");
        refresh_data(url, path);
    }

    fs.readFile(path, (err, data) => {
        if (err) throw err;
        const fileData = JSON.parse(data.toString());
        console.log(typeof(fileData));
        const result = fileData.filter(function(elem) {return elem.move_code==code.substring(1)});
        callback(result);
    })
}

module.exports = read_code