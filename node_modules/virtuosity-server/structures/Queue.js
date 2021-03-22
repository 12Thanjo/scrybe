/*
* @name Node
* @type return
* @description Queue node
*/
class Node{
	#data;
	#next;

	constructor(data){
		this.#data = data;
		this.#next = null;
	}

	/*
	* @name getData
	* @type method
	* @description get the data of the node
	* @parent Node
	*/
	getData = function(){
		return this.#data;
	}
	/*
	* @name setData
	* @type method
	* @description set the data of the node
	* @parent Node
	*/
	setData = function(data){
		this.#data = data;
	}

	/*
	* @name getNext
	* @type method
	* @description get the next node
	* @parent Node
	*/
	getNext = function(){
		return this.#next;
	}

	/*
	* @name setNext
	* @type method
	* @description set the next node
	* @parent Node
	*/
	setNext = function(next){
		this.#next = next;
	}
}

class Queue{
	#front; 
	#rear;
	#size;
	
	constructor(){
		this.#front = null;
		this.#rear = null;
		this.#size = 0;
	}

	/*
	* @name push
	* @type method
	* @description add a node to the queue
	* @param {data}{ANY}{data for the new node}
	*/
	push(data){
		var newRear = new Node(data);
		if(this.#size == 0){
			this.#front = newRear;
			this.#rear = newRear;
		}else{
			this.#rear.setNext(newRear);
			this.#rear = newRear;
		}
		this.#size += 1;
	}

	/*
	* @name pop
	* @type method
	* @description remove the top node
	*/
	pop(){
		var output = this.#front;
		this.#size -= 1;
		if(this.#size == 0){
			return null;
		}else{
			this.#front = output.getNext();
			return output;
		}
	}

	/*
	* @name peek
	* @type method
	* @description return the top node
	*/
	peek(){
		return this.#front;
	}

	/*
	* @name size
	* @type method
	* @description get the size of the Queue
	*/
	size(){
		return this.#size;
	}

	/*
	* @name print
	* @type method
	* @description output an array representation of the Queue
	*/
	print(){
		var output = [];
		var target = this.#front;
		while(target != null){
			output.push(target.getData());
			target = target.getNext();
		}
		return output;
	}
}


module.exports = Queue;