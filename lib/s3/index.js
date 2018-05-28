var AWS = require('aws-sdk');

function s3(config) {
	if(!config){
		throw new Error("S3 config missing")	
	}
	if( !config.accessKeyId && config.accessKeyId.length != 0){
		throw new Error("AWS accessKeyId missing")	
	}
	if(!config.secretAccessKey){
		throw new Error("AWS secretAccessKey missing")
	}
	if(!config.bucket) {
		throw new Error(" AWS bucektname missing")
	} 

	AWS.config.update({
		accessKeyId: config.accessKeyId,
		secretAccessKey: config.secretAccessKey
	});

	this.bucket = config.bucket;
	this.s3Client = new AWS.S3();

}

/**
 * @function save, saves the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
 s3.prototype.save = function(filename, data, callback) {
 	if(this.bucket && this.s3Client) {
 		var params = {
 			Bucket: this.bucket,
 			Key: filename,
 			Body: data
 		};

 		this.s3Client.upload(params, function (err, data) {
 			if (err) {
 				callback(err);
 			}
 			else {
 				callback(false, data)
 			}
 		});
 	} else {
 		throw new Error ("AWS S3 configurations not set")
 	}

 }

/**
 * @function open, opens the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
 s3.prototype.open = function(filename, callback) {

 	if(this.bucket && this.s3Client) {
 		var params = {
 			Bucket: this.bucket,
 			Key: filename
 		};

 		this.s3Client.getObject(params, function(err, data) {
 			if (err) {
 				callback(err);
 			}
 			else {
 				callback(false, data.Body.toString('utf8'))
 			}
 		});
 	} else {
 		throw new Error ("AWS S3 configurations not set")
 	}

 }

/**
 * @function delete, deletes the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
 s3.prototype.delete = function(filename, callback) {

 	if(this.bucket && this.s3Client) {
 		var params = {
 			Bucket: this.bucket, 
 			Key: filename
 		};

 		this.s3Client.deleteObject(params, function(err, data) {
 			if (err) {
 				callback(err);
 			}
 			else {
 				callback(false, data)
 			}
 		});
 	} else {
 		throw new Error ("AWS S3 configurations not set")
 	}
 }

/**
 * @function getDetails, fetches the of the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
 s3.prototype.getDetails = function(filename, data) {

 	if(this.bucket && this.s3Client) {
 		var params = {
 			Bucket: this.bucket,
 			Key: filename	
 		};

 		this.s3Client.getObject(params, function(err, data) {
 			if (err) {
 				callback(err);
 			}
 			else {
 				callback(false, data)
 			}
 		});
 	} else {
 		throw new Error ("AWS S3 configurations not set")
 	}

 }

 module.exports = s3;
