var fileStorage = require('./file-storage');

var options = {
	accessKeyId: "accessKeyId",
	secretAccessKey: "secretAccessKey",
	bucket: "bucket"
}

var fileStorageClientS3 = new fileStorage("s3", options);

var fileName = "bhavesh.txt";
var new_fileName = "sample.txt";
var data = "Hello";


fileStorageClientS3.save(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})

fileStorageClientS3.open(fileName, function (err, data) {
	if(err) {
		throw err;
	}
	else {
		console.log(data);
	}
})

fileStorageClientS3.rename(fileName, new_fileName, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file renamed successfully");
	}
})

fileStorageClientS3.delete(fileName, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file deleted successfully");
	}
})