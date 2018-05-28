var fileStorage = require('./file-storage');

var options = {
	accessKeyId: "accessKeyId",
	secretAccessKey: "secretAccessKey",
	bucket: "bucketName"
}

var fileStorageClientS3 = new fileStorage("s3", options);

var fileName = "bhavesh.txt";
var data = "Hi Bhavesh Here";


fileStorageClientS3.save(fileName, data, function (err) {
	if(err) {
		throw err;
	}
	else {
		console.log("file saved successfully");
	}
})