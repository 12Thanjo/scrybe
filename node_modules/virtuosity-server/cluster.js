var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var file;

if(cluster.isMaster){
    workers = new Map();
    process.send("Master is running (" + process.pid + ")");

    process.on('message',(input)=>{
	 	if(input.type == "start"){
	 		file = input.file;
	 		if(input.max != null && numCPUs > input.max){
	 			numCPUs = input.max;
	 		}	

			JSON.parse_map = function(jsonStr){
				return new Map(JSON.parse(jsonStr));
			}
			JSON.stringify_map = function(map){
				return JSON.stringify([...map]);
			}
	 		input.input = JSON.parse_map(input.input);

		    // Fork workers.
		    for(let i = 0; i < numCPUs; i++){
		        var worker = cluster.fork();
		        worker.input = input.input.get(i+1);
		        workers.set(worker.id, worker);
		        worker.on('message', (data)=>{
		        	if(data.type == "start"){
		            	process.send("Worker " + data.id + " started (" + data.pid + ")");
		            	workers.get(data.id).send({
		            		path: file,
		            		input: input.input.get(data.id)
		            	});
		        	}else{
		        		process.send(data);
		        	}
		        });
		    }
		    cluster.on('exit', (worker, code, signal) => {
		        process.send("Worker " + worker.id + " died (" + worker.process.pid + ")");
		        workers.delete(worker.id);
		        if(workers.size == 0){
		        	process.send("Master Died (" + process.pid + ")");
		        	process.exit();
		        }
		    });
	 	}
	});

}else{
    process.send({
    	type: "start",
    	id: cluster.worker.id,
    	pid: process.pid
    });

    process.on('message', (input)=>{
    	require(input.path)({
    		output: (data)=>{
    			process.send({
    				data: data,
    				id: cluster.worker.id
    			});
    		},
    		id: cluster.worker.id,
    		pid: cluster.worker.pid,
    		input: input.input
    	})()();
    });
}