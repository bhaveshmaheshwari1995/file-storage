var fileSystem = require('./file-system');
var s3 = require('./s3');

function FileStorage(mode, config) {
	this.mode = mode;
	if (mode == "s3"){
		this.FileStorageClient = new s3(config);
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
 * @param function callback,
 * @return Buffer data
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
 * @function getDetails, fetches the details of the file
 * @param String filename,
 * @param function callback
 */
FileStorage.prototype.getDetails = function(filename, callback) {
	this.FileStorageClient.getDetails(filename, callback);
}

/**
 * @function rename, renames the file
 * @param String filename,
 * @param function callback
 */
FileStorage.prototype.rename = function(old_filename, new_filename, callback) {
	this.FileStorageClient.rename(old_filename, new_filename, callback);
}

module.exports = FileStorage;