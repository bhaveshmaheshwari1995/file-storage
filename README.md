# File Storage Library #

A node.js File Storage library

Steps to run the library.

1. load the library
// var fileStorage = require('./file-storage');

2. initialize the client with the mode => local or s3
// var fileStorageClientLocal = new fileStorage("local");

There are multiple functionalities in this library
save file
open file
delete file
get file details

Save File

@params filename, data, callback

fileStorageClientLocal.save(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})

Open File

@params filename, callback

fileStorageClientLocal.open(fileName, function (err, data) {
	if(err) {
		throw err;
	}
	else {
		console.log(`data: ${data}`);
	}
})

Open File

@params filename, callback

fileStorageClientLocal.open(fileName, function (err, data) {
	if(err) {
		throw err;
	}
	else {
		console.log(`data: ${data}`);
	}
})

Delete File

@params filename, callback

fileStorageClientLocal.delete(fileName, delete, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file deleted successfully");
	}
})

getdetails of a File

@params filename, callback

fileStorageClientLocal.getDetails(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})


Note For S3 mode set the config

var options = {
	accessKeyId: "accessKeyId",
	secretAccessKey: "secretAccessKey",
	bucket: "bucket"
}

fileStorageClientS3.setConfigAndUpdate(options);

