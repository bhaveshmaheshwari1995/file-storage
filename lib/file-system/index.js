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
			callback(false, true)
		}
		
	});
}

/**
 * @function save, saves the file
 * @param String filename,
 * @param function callback
 */
FileSystem.prototype.open = function(filename, callback) {
	
	fs.readFile('input.txt', function (err, data) {
		if (err) {
			callback(err)
		} else {
			callback(false, data)
		}
	});
}

/**
 * @function save, saves the file
 * @param String filename,
 * @param function callback
 */
FileSystem.prototype.delete = function(filename, callback) {

	fs.unlink(filename, function(err) {
		if (err) {
			callback(err)
		} else {
			callback(false, true)
		}
	});
}

/**
 * @function save, saves the file
 * @param String filename,
 * @param function callback
 */
FileSystem.prototype.getDetails = function(filename, callback) {
		
	fs.stat(filename, function (err, stats) {
		if (err) {
			callback(err)
		} else {
			callback(false, stats)
		}
	});
}

module.exports = FileSystem;