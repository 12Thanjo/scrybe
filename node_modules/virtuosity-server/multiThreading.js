// const { Worker } = require('worker_threads');

// threaded_task = function(path, workerData, options){
// 	return new Promise((resolve, reject)=>{
// 		const worker = new Worker(path, { workerData });
// 		worker.on('message', (message)=>{
// 			if(options && options.onmessage){
// 				options.onmessage(message);
// 			}
// 			resolve();
// 		});
// 		worker.on('error', reject);
// 		worker.on('exit', (code)=>{
// 			if(code !== 0){
// 				reject(new Error("Worker stopped with exit code:" +  code));
// 			}else if(options && options.oncomplete){
// 				options.oncomplete();
// 			}
// 		});
// 	});
// }


// Task = function(path, options){
// 	this.path = path;
// 	this.options = options;
// 	this.threads = [];
// 	this.addThread = function(data){
// 		this.threads.push(data);
// 	}
// 	this.clearThreads = function(){
// 		this.threads = [];
// 	}


// 	this.run = async function(onComplete){
// 		var running = this.threads.length;
// 		var output = [];
// 		this.threads.forEach((thread)=>{
// 			threaded_task(this.path, thread, {
// 				onmessage: (message)=>{
// 					console.log("(" + thread + ") onmessage: " + message);
// 					running -= 1;
// 					output.push({
// 						input: thread,
// 						output: message
// 					});
// 					if(running == 0){
// 						onComplete(output);
// 					}
// 				}
// 			});
// 		});
// 	}

// }

var files = {};


var cp = require('child_process');
/*
* @name Thread
* @type class
* @description Creates a separate run thread (multithreading)
* @param {path}{String}{path to the file to run in the thread}
* @param {onMessage}{Function}{action to complete when the thread sends a message using process.send(data)}
* @param {onExit}{Function}{action to complete when the thread exits}
*/
Thread = function(path, onMessage, onExit){
	this.path = path;
	this.child = cp.fork(path, [], {
		silent: false,
		detached: true, 
		stdio: 'ignore',
   });

	if(onMessage != null){
		this.child.on('message', (data)=>{
			onMessage(data);
		});
	}

	if(onExit != null){
		this.child.on('exit', (data)=>{
			onExit(data);
		});
	}

	this.child.on('error', (err) => {
	   	console.log("ERROR: spawn failed! (" + err + ")");
	});

	/*
	* @name send
	* @type method
	* @description Semds data to the thread
	* @parent Thread
	* @param {data}{Object}{data to send to the thread. This message is recieved with: <code><span class="blue">process</span>.<span class="blue">on</span>(<span class="yellow">'message'</span>, <span class="blue">function</span>(<span class="orange">data</span>));</code> }
	*/
	this.send = function(data){
		this.child.send(data);
	}
}

process.on('message', Function);


/*
* @name cluster
* @type method
* @description creates a cluster of threads
* @param {path}{String}{path to the file to run in the thread}
* @param {input}{Map}{data to send to the threads. The key of the map cooresponds to the thread}
* @param {onComplete}{Function}{action to complete when the thread exits (takes output of the cluster as a parameter)}
* @param {threads}{Int}{[Optional, default is number of CPU cores the computer has] Number of threads for the cluster to create}
*/
var cluster = async function(path, input, onComplete, threads){
	JSON.stringify_map = function(map){
		return JSON.stringify([...map]);
	}

	input = JSON.stringify_map(input);

	var run = false;

	if(threads == null){
		run = true;
	}else{
		if(threads < 2){
			console.error("At least 2 threads are needed for a cluster")
		}else if(threads > numCPUs){
			console.error("Too many threads for this CPU (max: " + numCPUs + ")");
		}else{
			run = true;
		}
	}

	if(run){
		var output = new Map();
		var new_thread = new Thread(__dirname + '/cluster.js', (data)=>{
			if(data.id != null){
	            if(output.get(data.id) == null){
	            	output.set(data.id, [data.data]);
	            }else{
	            	output.get(data.id).push(data.data);
	            }
			}else{
				console.log(data);
			}
        }, (data)=>{
        	if(data == 0){
        		onComplete(output);
        	}else{
        		console.error("Something went wrong with the cluster");
        	}
        });
        new_thread.send({type:"start", file: path, max: threads, input: input});
	}
}





/*
* @name cluster-worker
* @type return
* @description This is an object passed to the cluster worker. A cluster worker should be structured: <code><span class="blue">module</span>.<span class="green">exports</span><span class="red">=</span>(<span class="orange">worker</span>)<span class="blue">=></span>{};</code>
*/
/*
* @name output
* @type method
* @description Sends output back to the thread. Can be called as many times a you would like.
* @parent cluster-worker
*/

/*
* @name input
* @type property
* @description input to the cluster-worker
* @parent cluster-worker
*/

/*
* @name id
* @type property
* @description id of the cluster-worker
* @parent cluster-worker
*/

/*
* @name pid
* @type property
* @description pid of the cluster-worker
* @parent cluster-worker
*/

var numCPUs = require('os').cpus().length;

module.exports = {
	thread: (path, onMessage, onExit)=>{
		return new Thread(path, onMessage, onExit);
	},
	cluster: async (file, input, onComplete, threads)=>{
		cluster(file, input, onComplete, threads)
	}
}