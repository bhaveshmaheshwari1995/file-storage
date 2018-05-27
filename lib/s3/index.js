var AWS = require('aws-sdk');

function s3() {
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
 * @function save, saves the file
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
 * @function save, saves the file
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

/**
 * @function save, saves the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
s3.prototype.setConfig = function(data) {
	
	if(!data.accessKeyId){
		throw new Error("AWS accessKeyId missing")	
	} else if(!data.secretAccessKey){
		throw new Error("AWS secretAccessKey missing")
	} else if(!data.bucket) {
		throw new Error(" AWS bucektname missing")
	} else{

		AWS.config.update({
			accessKeyId: data.accessKeyId,
			secretAccessKey: data.secretAccessKey
		});

		this.bucket = data.bucket;
		this.s3Client = new AWS.S3();

	}

}

module.exports = s3;