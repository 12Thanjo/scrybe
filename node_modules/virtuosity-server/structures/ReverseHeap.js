class ReverseHeap{
	#arr;

	constructor(){
		this.#arr = [];
	}

	/*
	* @name size
	* @type method
	* @description get the size of the reverse heap
	*/
	size = function(){
		return this.#arr.length;
	}

	/*
	* @name push
	* @type method
	* @description add a value to the reverse heap
	* @param {val}{Number}{vale to add to the reverse heap}
	*/
	push = function(val){
		var index = this.#arr.length;
		var parent = Math.floor((index-1)/2);
		while(this.#arr[parent] < val && index != 0){
			this.#arr[index] = this.#arr[parent];
			index = parent;
			parent = Math.floor((index-1)/2);
		}
		this.#arr[index] = val;
	}

	/*
	* @name print
	* @type method
	* @description print the array of the reverse heap
	*/
	print = function(){
		return this.#arr;
	}

	/*
	* @name peek
	* @type method
	* @description get the highest value
	*/
	peek = function(){
		return this.#arr[0];
	}

	/*
	* @name pop
	* @type method
	* @description get and remove the highest value
	*/
	pop = function(){
		return this.remove(0);
	}

	/*
	* @name remove
	* @type method
	* @description get and remove a value from a specific index
	* @param {i}{Int}{index of the value to remove}
	*/
	remove = function(i){
		var output = this.#arr[i];

		var target = this.#arr.pop();
		this.#arr[i] = target;
		while(true){
			var left_i = 2*i+1;
			var right_i = 2*i+2;
			var left = this.#arr[left_i];
			var right = this.#arr[right_i];
			if(left == null){
				break;
			}else if(target > left && target > right){
				break;
			}else{
				if(right == null || left > right){//go left
					this.#arr[i] = left;
					this.#arr[left_i] = target;
					i = left_i;
				}else{//go right
					this.#arr[i] = right;
					this.#arr[right_i] = target;
					i = right_i;
				}
			}
		}

		return output;
	}
}


module.exports = ReverseHeap;