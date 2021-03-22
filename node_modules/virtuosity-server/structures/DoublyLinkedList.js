/*
* @name Node
* @type return
* @description DoublyLinkedList node
*/
class Node{
	#data;
	#next;
	#previous;

	constructor(data){
		this.#data = data;
		this.#next = null;
		this.#previous = null;
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

	/*
	* @name getPrevious
	* @type method
	* @description get the previous node
	* @parent Node
	*/
	getPrevious = function(){
		return this.#previous;
	}

	/*
	* @name setPrevious
	* @type method
	* @description set the previous node
	* @parent Node
	*/
	setPrevious = function(previous){
		this.#previous = previous;
	}
}


class DoublyLinkedList{
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
	* @description add a node to the doubly linked list
	* @param {data}{ANY}{data for the new node}
	*/
	push(data){
		if(this.#front == null){
			this.#front = new Node(data);
			this.#rear = this.#front;
		}else{
			var new_node = new Node(data);
			this.#rear.setNext(new_node);
			new_node.setPrevious(this.#rear);
			this.#rear = new_node;
		}
		this.#size += 1;
	}

	/*
	* @name delete
	* @type method
	* @description delete a node
	* @param {i}{Int}{index of the node}
	*/
	delete(i){
		if(i > this.#size - 1 || i < 0){
			return null;
		}else{
			if(i == 0){
				var output = this.#front;
				this.#front = output.getNext();
				this.#front.setPrevious(null);
				return output;
			}else if(i == this.#size - 1){
				var output = this.#rear;
				this.#rear = output.getPrevious();
				this.#rear.setNext(null);
				return ouput;
			}else{
				if(i / this.#size < 0.5){//faster to go forwards
					var target = this.#front;
					while(i > 1){
						target = target.getNext();
						i -= 1;
					}

					var previous = target;
					var next = target.getNext().getNext();

					next.setPrevious(previous);
					previous.setNext(next);

					return target;
				}else{//faster to go backwards
					i = this.#size - i;
					var target = this.#front;
					while(i > 1){
						target = target.getPrevious();
						i -= 1;
					}

					var next = target;
					var previous = target.getPrevious().getPrevious();

					next.setPrevious(previous);
					previous.setNext(next);

					return target;
				}
			}
		}
	}

	/*
	* @name get
	* @type method
	* @description get a node
	* @param {i}{Int}{index of the node}
	*/
	get(i){
		if(i > this.#size - 1 || i < 0){
			return null;
		}else{
			if(i / this.#size < 0.5){//faster to go forwards
				var target = this.#front;
				while(i > 0){
					target = target.getNext();
					i -= 1;
				}
				return target;
			}else{//faster to go backwards
				i = this.#size - i;
				var target = this.#rear;
				while(i > 0){
					target = target.getPrevious();
					i -= 1;
				}
				return target;
			}
		}
	}

	/*
	* @name peek
	* @type method
	* @description get the head of the doubly linked list
	*/
	peek(){
		return this.#front;
	}

	/*
	* @name size
	* @type method
	* @description get the size of the doubly linked list
	*/
	size(){
		return this.#size;
	}

	/*
	* @name print
	* @type method
	* @description output an array representation of the doubly linked list
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

module.exports = DoublyLinkedList;