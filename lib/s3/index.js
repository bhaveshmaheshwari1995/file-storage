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
	this.s3Client = new AWS.S3({apiVersion: '2006-03-01'});
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
 * @return Buffer data
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
				callback(false, data.Body)
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
 * @function save, saves the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
s3.prototype.getDetails = function(filename, callback) {

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
				callback(false, fileDetails(filename, data))
			}
		});
	} else {
		throw new Error ("AWS S3 configurations not set")
	}
}

/**
 * @function rename, rename the old file the file
 * @function save, saves the file
 * @param String filename,
 * @param function callback
 */
s3.prototype.rename = function(old_filename, new_filename, callback) {

	if(this.bucket && this.s3Client) {
		var that = this;
		var params = {
			Bucket: this.bucket,
			CopySource: this.bucket+"/"+old_filename,
			Key: new_filename
		};

		this.s3Client.copyObject(params, function(err, data) {
			if (err) {
				callback(err);
			}
			else {
				params = {
					Bucket: that.bucket,
					Key: old_filename	
				};
				that.s3Client.deleteObject(params, function(err) {
					if (err) {
						callback(err);
					}
					else {
						callback(false);
					}
				});
			}
		});
	} else {
		throw new Error ("AWS S3 configurations not set")
	}
}


var fileDetails = function(filename, data){
	return {
		"fileName": filename,
		"fileSize": data.ContentLength,
		"LastModified": data.LastModified,
		"ContentType": data.ContentType
	}
}

module.exports = s3;