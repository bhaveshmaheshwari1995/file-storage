var fileStorage = require('./file-storage');

var fileStorageClientLocal = new fileStorage("local");

var fileName = "bhavesh.txt";
var data = "hello";

fileStorageClientLocal.save(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})