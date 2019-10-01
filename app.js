var fs = require("fs");
var JSZip = require("jszip");
 
// read a zip files
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
