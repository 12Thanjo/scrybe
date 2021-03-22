/*
* @name Timer
* @type method
* @description Runs a function after a set duration.
* @param {duration}{Int}{duration of the timer}
* @param {func}{Function}{Funciton for the timer to run when completed}
*/
var timer = function(duration, func){
	setTimeout(func, duration);
}

/*
* @name advancedTimer
* @type class
* @description Timer with extra functionality
* @param {duration}{Int}{duration of the advancedTimer}
* @param {func}{Function}{Funciton for the advancedTimer to run when completed}
*/
var advancedTimer = function(duration, func){
	this.func = func;
	this.DATA = {
		started: 0,
		duration: duration,
		replay: 0,
		running: false,
		paused: false
	}

	/*
	* @name running
	* @type property
	* @proto Boolean
	* @description True if the advancedTimer is running
	* @parent advancedTimer
	*/
	Object.defineProperty(this, 'running', {
		get: ()=>{
			return this.DATA.running;
		}
	});

	/*
	* @name paused
	* @type property
	* @proto Boolean
	* @description True if the advancedTimer is paused
	* @parent advancedTimer
	*/
	Object.defineProperty(this, 'paused', {
		get: ()=>{
			return this.DATA.paused;
		}
	});

	/*
	* @name duration
	* @type property
	* @proto Number
	* @description Sets the duration of the advancedTimer. If advancedTimer is running while the duration is changed, and it is changed to a time less than what has elapsed already, the advancedTimer ends.
	* @parent advancedTimer
	*/
	Object.defineProperty(this, "duration", {
		get: ()=>{
			return this.DATA.duration;
		},
		set: (val)=>{
			this.DATA.duration = val;
			if(this.running){
				var now = new Date();
				if(now - this.DATA.started > val){
					clearTimeout(this.timer);
					this.func();
				}
			}
		}
	});

	/*
	* @name start
	* @type method
	* @description Starts the advancedTimer, or continues the advancedTimer (if it had been paused).
	* @parent advancedTimer
	*/
	this.start = function(){
		if(this.DATA.replay != 0){
			this.DATA.replay = 0;
			this.DATA.started = new Date();
			this.running = true;
			this.timer = setTimeout(this.func, this.duration);
		}else{
			this.DATA.started = new Date();
			this.running = true;
			this.timer = setTimeout(this.func,this.duration);
		}
	}

	/*
	* @name stop
	* @type method
	* @description Stops the advancedTimer
	* @parent advancedTimer
	*/
	this.stop = function(){
		clearTimeout(this.timer);
		this.running = false;
	}

	/*
	* @name pause
	* @type method
	* @description Pauses the advancedTimer
	* @parent advancedTimer
	*/
	this.pause = function(){
		this.paused = true;
		var now = new Date();
		this.DATA.replay = this.duration - (now - this.DATA.started);
	}

	/*
	* @name getTimeLeft
	* @type method
	* @description Gets the time left until the timer finishes
	* @parent advancedTimer
	*/
	this.getTimeLeft = function(){
		if(this.running){
			var now = new Date();
			return this.duration - (now - this.DATA.started);
		}else{
			return 0;
		}
	}
}

/*
* @name Interval
* @type method
* @description Runs a function at a set interval.
* @param {duration}{Int}{duration of the Interval}
* @param {func}{Function}{Funciton for the Interval to run when completed}
*/
var interval = function(duration, func){
	setInterval(func, duration);
}

/*
* @name advancedInterval
* @type class
* @description Runs a function at a set interval, with some extra functionality.
* @param {duration}{Int}{duration of the Interval}
* @param {func}{Function}{Funciton for the Interval to run when completed}
*/
var advancedInterval = function(duration, func){
	this.func = func;
	this.DATA = {
		duration: duration,
		running: false
	}

	/*
	* @name duration
	* @type property
	* @description The duration of the interval of the advancedInterval.
	* @parent advancedInterval
	*/
	Object.defineProperty(this, "duration", {
		get: ()=>{
			return this.DATA.duration;
		},
		set: (val)=>{
			this.DATA.duration = val;
			if(this.running){
				clearInterval(this.timer);
				this.timer = setInterval(this.func, this.DATA.duration);
			}
		}
	});

	/*
	* @name running
	* @type property
	* @description True if the advancedInterval is currently running.
	* @parent advancedInterval
	*/
	Object.defineProperty(this, "running", {
		get: ()=>{
			return this.DATA.running;
		}
	});

	/*
	* @name start
	* @type method
	* @description Starts the advancedInterval.
	* @parent advancedInterval
	*/
	this.start = function(){
		this.running = true;
		this.timer = setInterval(this.func,this.duration);
	}

	/*
	* @name stop
	* @type method
	* @description Stops the advancedInterval.
	* @parent advancedInterval
	*/
	this.stop = function(){
		clearInterval(this.timer);
		this.running = false;
	}
}



module.exports = {
	timer: timer,
	advancedTimer: advancedTimer,
	interval: interval,
	advancedInterval: advancedInterval
}