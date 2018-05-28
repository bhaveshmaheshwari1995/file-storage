var fs = require("fs");

function FileSystem() {
}

/**
 * @function save, saves the file
 * @param String filename,
 * @param String data,
 * @param function callback
 */
FileSystem.prototype.save = function(filename, data, callback) {

	fs.writeFile(filename, data,  function(err) {
		if (err) {
			callback(err)
		} else {
			callback(false)
		}
		
	});
}

/**
 * @function save, saves the file
 * @param String filename,
 * @param function callback
 * @return Buffer data
 */
FileSystem.prototype.open = function(filename, callback) {
	
	fs.readFile(filename, function (err, data) {
		if (err) {
			callback(err)
		} else {
			callback(false, data)
		}
	});
}

/**
 * @function delate, deletes the file
 * @param String filename,
 * @param function callback
 */
FileSystem.prototype.delete = function(filename, callback) {

	fs.unlink(filename, function(err) {
		if (err) {
			callback(err)
		} else {
			callback(false)
		}
	});
}

/**
 * @function getDetails, returns the details of the file
 * @param String filename,
 * @param function callback
 */
FileSystem.prototype.getDetails = function(filename, callback) {
		
	fs.stat(filename, function (err, stats) {
		if (err) {
			callback(err)
		} else {
			callback(false, fileDetails(filename, stats));
		}
	});
}

/**
 * @function rename, rename the old file the file
 * @function save, saves the file
 * @param String filename,
 * @param function callback
 */
FileSystem.prototype.rename = function(old_filename, new_filename, callback) {
		
	fs.rename(old_filename, new_filename, function(err) {
		if (err) {
			callback(err);
		}
		else{
			callback(false);
		}
		
	});
}

var fileDetails = function(filename, data){
	return {
		"fileName": filename,
		"fileSize": data.size,
		"LastModified": data.mtime
	}
}

module.exports = FileSystem;