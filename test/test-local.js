var fileStorage = require('../../file-storage');

var fileStorageClientLocal = new fileStorage("local");

var fileName = "sample.txt";
var new_fileName = "sample2.txt"
var data = "hello";

fileStorageClientLocal.save(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})

fileStorageClientLocal.open(fileName, function (err, data) {
	if(err) {
		throw err;
	}
	else {
		console.log(data);
	}
})

fileStorageClientLocal.rename(fileName, new_fileName, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file renamed successfully");
	}
})

fileStorageClientLocal.delete(fileName, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file deleted successfully");
	}
})