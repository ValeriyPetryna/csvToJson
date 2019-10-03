const fs = require('fs');
const csvjson = require('csvjson'); // read and parse csv files
const moment = require('moment'); // format dates
const JSZip = require('jszip'); // read zip archive

fs.readFile('data.zip', function(err, data) {
  if (!err) {
    const outputData = []; // output array
    var zip = new JSZip();
    zip.loadAsync(data).then(function(contents) {
      Object.keys(contents.files).forEach(function(filename) {
        zip
          .file(filename)
          .async('nodebuffer')
          .then(function(content) {
            fs.writeFileSync(filename, content);
            const data = fs.readFileSync(filename, 'utf8');
            const options = {
              delimiter: '||',
              quote: true,
            };
            const parsedUsers = csvjson.toObject(data, options); // convert csv file to object
            let output = parsedUsers.map(user => {

              return {
                name: user.name,
                phone: user.phone.replace(/\D+/g, ''), // cut extra symbols
                person: {
                  firstName: user.first_name,
                  lastName: user.last_name,
                },
                amount: +user.amount,
                date: moment(user.date, 'DD/MM/YYYY').format('YYYY-MM-DD'), // also can use pure js methods, something like this : new Date(user.date).toISOString().split('T')[0]
                costCenterNum: user.cc.slice(3), // slise prefix
              };
            });

            outputData.push(...output); // push file elements (users) to output array
            const file = JSON.stringify(outputData);
            fs.writeFileSync('output.json', file); // write output array to json file
          });
      });
      console.log('output.json was successfully created!');
    });
  }
});
