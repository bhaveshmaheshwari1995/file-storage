var fileStorage = require('./file-storage');

var fileStorageClientLocal = new fileStorage("local");
var fileStorageClientS3 = new fileStorage("s3");

var fileName = "bhavesh.txt";
var data = "hello";

var options = {
	accessKeyId: "accessKeyId",
	secretAccessKey: "secretAccessKey",
	bucket: "bucket"
}

fileStorageClientS3.setConfigAndUpdate(options);

fileStorageClientS3.save(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})