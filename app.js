const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');
const moment = require('moment');

let parsedUsers = [];
const data = fs.readFileSync(path.join(__dirname, 'users1.csv'), { encoding: 'utf8' });

const options = {
  delimiter: '||', // optional
  quote: '""', // optional
};
parsedUsers = csvjson.toObject(data, options);

// console.log(parsedUsers)

const outputData = parsedUsers.map(user => {
  return {
    name: user.name,
    phone: user.phone.replace(/\D+/g, ''),
    person: {
      firstName: user.first_name,
      lastName: user.last_name,
    },
    amount: +user.amount,
    date: moment(user.date, 'DD/MM/YYYY').format('YYYY-MM-DD'), // new Date(user.date).toISOString().split('T')[0] not working correctly
    datee: new Date(user.date).toISOString().split('T')[0],
    costCenterNum: user.cc.replace(/\D+/g, ''),
  };
});
// console.log(outputData);

/*
var d = new Date('2017-09-21T21:00:00.000Z');
dateformat(d, 'DD-MM-YYYY')
console.log(Date.parse(str))
const JSZip = require('jszip');
const readFile = require('fs').readFile;
read a zip files
fs.readFile("testData.zip", function(err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(function (zip) {
      files = Object.keys(zip.files);
      files.forEach(element => {
        zip.file(element).async("string").then(function (data) {
            console.log(data);
        });
      });
      console.log(files);
    });
});

readFile('./users1.csv', 'utf-8', (err, fileContent) => {
  if(err) {
      console.log(err); // Do something to handle the error or just throw it
      throw new Error(err);
  }
  const jsonObj = csvjson.toObject(fileContent);
  console.log(jsonObj);
});
const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const csvjson = require('csvjson');
const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();
createReadStream('./users1.csv', 'utf-8')
    .pipe(toObject)
    .pipe(stringify)
    .pipe(createWriteStream('./test-data-output-stream.json'));
*/
