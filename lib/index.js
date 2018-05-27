var fileSystem = require('./file-system');
var s3 = require('./s3');

function FileStorage(mode) {
	this.mode = mode;
	if (mode == "s3"){
		this.FileStorageClient = new s3();
	}
	else {
		this.FileStorageClient = new fileSystem();
	}
}

/**
 * @function save, saves the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
FileStorage.prototype.save = function(filename, data, callback) {
	this.FileStorageClient.save(filename, data, callback);
}

/**
 * @function open, gives the data of the file
 * @param String filename,
 * @param function callback
 */
FileStorage.prototype.open = function(filename, callback) {
	this.FileStorageClient.open(filename, callback);
}

/**
 * @function delete, deletes the file
 * @param String filename,
 * @param function callback
 */
FileStorage.prototype.delete = function(filename, callback) {
	this.FileStorageClient.delete(filename, callback);
}

/**
 * @function getDetails, calls the save function of the client
 * @param String filename,
 * @param function callback
 */
FileStorage.prototype.getDetails = function(filename, callback) {
	this.FileStorageClient.getDetails(filename, callback);
}

/**
 * @function setS3Config, sets the S3 Config
 * @param {*} data,
 */
FileStorage.prototype.setS3Config = function(data) {

	if(this.mode == "s3"){
		this.FileStorageClient.setConfig(data);
	}
	else {
		throw new Error("cannot add property to local mode");
	}
}

module.exports = FileStorage;