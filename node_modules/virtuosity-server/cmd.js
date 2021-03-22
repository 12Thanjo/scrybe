var util = require('util');

/*
* @name color
* @type obj
* @description set console text color. Add to the stringh to change the color.

* @name black
* @type property
* @description text color black
* @parent color

* @name red
* @type property
* @description text color red
* @parent color

* @name yellow
* @type property
* @description text color yellow
* @parent color

* @name green
* @type property
* @description text color green
* @parent color

* @name blue
* @type property
* @description text color blue
* @parent color

* @name magenta
* @type property
* @description text color magenta
* @parent color

* @name cyan
* @type property
* @description text color cyan
* @parent color

* @name white
* @type property
* @description text color white
* @parent color
*/
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

/*
* @name backgroundColor
* @type obj
* @description set console text background color. Add to the stringh to change the background color.

* @name black
* @type property
* @description text background color black
* @parent backgroundColor

* @name red
* @type property
* @description text background color red
* @parent backgroundColor

* @name yellow
* @type property
* @description text background color yellow
* @parent backgroundColor

* @name green
* @type property
* @description text background color green
* @parent backgroundColor

* @name blue
* @type property
* @description text background color blue
* @parent backgroundColor

* @name magenta
* @type property
* @description text background color magenta
* @parent backgroundColor

* @name cyan
* @type property
* @description text background color cyan
* @parent backgroundColor

* @name white
* @type property
* @description text background color white
* @parent backgroundColor
*/
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

/*
* @name style
* @type obj
* @description set the style of the text

* @name reset
* @type property
* @description reset the text
* @parent style

* @name bright
* @type property
* @description set the text bright 
* @parent style

* @name dim
* @type property
* @description set the text dim
* @parent style

* @name underscore
* @type property
* @description set the text underscore
* @parent style

* @name blink
* @type property
* @description set the text blink
* @parent style

* @name reverse
* @type property
* @description set the text reverse
* @parent style

* @name hidden
* @type property
* @description set the text hidden
* @parent style
*/
var style = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m"
}

var enable_input = function(func){
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
	backgroundColor: background_color,
	style: style,
	enableInput: enable_input,
	log: (string, color)=>{
		if(color != null){
			console.log(color + string + colors.white + background_color.black);
		}else{
			console.log(string + colors.white + background_color.black);
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