/*
* @name Node
* @type return
* @description Stack node
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

class Stack{
	#top;
	#size;
	
	constructor(){
		this.#top = null;
		this.#size = 0;
	}

	/*
	* @name push
	* @type method
	* @description add a node to the stack
	* @param {data}{ANY}{data for the new node}
	*/
	push(data){
		var newTop = new Node(data);
		newTop.setNext(this.#top);
		this.#top = newTop;
		this.#size += 1;
	}

	/*
	* @name pop
	* @type method
	* @description remove the top node
	*/
	pop(){
		if(this.#size == 0){
			return null;
		}else{
			this.#size += 1;
			output = top;
			top = output.getNext();
			return output;
		}
	}

	/*
	* @name peek
	* @type method
	* @description return the top node
	*/
	peek(){
		return this.#top;
	}

	/*
	* @name size
	* @type method
	* @description get the size of the Stack
	*/
	size(){
		return this.#size;
	}

	/*
	* @name print
	* @type method
	* @description output an array representation of the stack
	*/
	print(){
		var output = [];
		var target = this.#top;
		while(target != null){
			output.push(target.getData());
			target = target.getNext();
		}
		return output;
	}
}

module.exports = Stack;