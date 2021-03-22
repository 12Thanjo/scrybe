/*
* @name Node
* @type return
* @description LinkedList node
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

class LinkedList{
	#head; 
	#size;
	
	constructor(){
		this.#head = null;
		this.#size = 0;
	}

	/*
	* @name push
	* @type method
	* @description add a node
	* @param {data}{ANY}{data for the new node}
	*/
	push(data){
		if(this.#head == null){
			this.#head = new Node(data);
		}else{
			var target = this.#head;
			while(target.getNext() != null){
				target = target.getNext();
			}
			target.setNext(new Node(data));
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
				var output = this.#head;
				this.#head = target.getNext();
				return output;
			}else{
				var target = this.#head;
				while(i > 1){
					target = target.getNext();
					i -= 1;
				}

				if(target.getNext != null){
					var output = target.getNext();
					target.setNext(output.getNext());
					return output;
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
			var target = this.#head;
			while(i > 0){
				target = target.getNext();
				i -= 1;
			}
			return target;
		}
	}

	/*
	* @name peek
	* @type method
	* @description get the head of the linked list
	*/
	peek(){
		return this.#head;
	}

	/*
	* @name size
	* @type method
	* @description get the size of the linked list
	*/
	size(){
		return this.#size;
	}

	/*
	* @name print
	* @type method
	* @description output an array representation of the linked list
	*/
	print(){
		var output = [];
		var target = this.#head;
		while(target != null){
			output.push(target.getData());
			target = target.getNext();
		}
		return output;
	}
}


module.exports = LinkedList;