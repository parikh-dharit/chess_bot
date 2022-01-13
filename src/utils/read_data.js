const fs = require('fs');
const refresh_data = require('./refresh_data');

const read_data = (url, path, callback) => {
    console.log(path)
    if (fs.existsSync(path)){
        console.log("File found!");
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            callback(undefined, JSON.parse(data));
        })
    } else {
        refresh_data(url, path, callback);
    }
}

module.exports = read_data