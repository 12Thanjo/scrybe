var collisionManager = require('./collisionManager.js');
var multiThreading = require('./multiThreading.js');
var files = require('./files.js');
var time = require('./time.js');
var string = require('./string.js');
var cnsl = require('./console.js');



module.exports = {
	collisionManager: collisionManager,
	multiThreading: multiThreading,
	files: files,
	time: time,
	string: string,
	console: cnsl
}