var util = require('util');


var colors = {
	black: "\x1b[30m", 
	red: "\x1b[31m",
	yellow: "\x1b[33m",
	green: "\x1b[32m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m"
}


var background_color = {
	black: "\x1b[40m",
	red: "\x1b[41m",
	green: "\x1b[42m",
	yellow: "\x1b[43m",
	blue: "\x1b[44m",
	magenta: "\x1b[45m",
	cyan: "\x1b[46m",
	white: "\x1b[47m"
}

var style = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m"
}

enable_input = function(func){
	util.inspect.defaultOptions.depth = null;
	//allows server admin to type commands into console
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', ()=>{
	    var chunk;
	    // Use a loop to make sure we read all available data.
	    while((chunk = process.stdin.read()) !== null){
	        try{
	        	func(chunk);
	        }catch(e){
	            console.log("\x1b[31m" + e + "\x1b[37m\n");
	        }
	    }
	});
}


module.exports = {
	color: colors,
	background_color: background_color,
	style: style,
	enableInput: enable_input,
	log: (string, color)=>{
		if(color != null){
			console.log(color + string + colors.white);
		}else{
			console.log(string + colors.white);
		}
	},
	specialLog: (data)=>{
		if(typeof data != "string"){
			console.log(data);
			console.log();
		}else{
			if(!isNaN(data)){//number
	    		console.log(colors.orange + data + colors.white + "\n");
			}else{//string
				console.log(colors.green + "'" + data + "'" + colors.white + "\n");
			}
		}
	}
}