Object.prototype.in = function() {
    for(var i=0; i<arguments.length; i++)
       if(arguments[i] == this) return true;
    return false;
}



var virtuosity = require('virtuosity-server');
var {files} = require('virtuosity-server');
var nodehp = require('nodehp');

virtuosity.cmd.log("SCRYBE", virtuosity.cmd.color.green);
virtuosity.cmd.log("automatic documentation tool", virtuosity.cmd.color.green);
virtuosity.cmd.log("------------------------------------");
virtuosity.cmd.log(" ");
virtuosity.cmd.log("Files: ", virtuosity.cmd.color.yellow);
virtuosity.cmd.log("-------");

error = function(message, line){
	virtuosity.cmd.log("ERROR: " + message, virtuosity.cmd.color.red);
	if(line != null){
		virtuosity.cmd.log("Line: " + line, virtuosity.cmd.color.red);
	}
	process.exit();
}

var args = [];
var argv = process.argv.slice(2);

for(var i=0; i<argv.length;i+=1){
	if(argv[i][0] == "-"){
		if(argv[i][1] == "-"){
			args.push({
				command: argv[i],
				data: null
			});
		}else{
			args.push({
				command: argv[i],
				data: argv[i+1]
			});
		}
	}else{
		args.push({
			command: argv[i],
			data: null
		});
	}
}

check_string_for_keyword = function(string, cursor, keyword){
	for(var i=0; i<keyword.length;i++){
		if(string[cursor+i] != keyword[i]){
			return false;
		}
	}
	return true;
}


var file_path = "";
var print_path = "";
var dark_mode = false;
args.forEach((arg)=>{
	if(arg.command == "-file" || arg.command == "-f"){
		file_path = arg.data;
	}else if(arg.command == "-print" || arg.command == "-p"){
		print_path = arg.data;
	}
});

if(file_path == ""){
	error(`Please add file location using the "-file" or "-f" tag`);
}
if(print_path == ""){
	error(`Please add print location using the "-print" or "-p" tag`);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Entity = function(){
	this.name = '';
	this.type = '';
	this.proto = '';
	this.parent = null;
	this.parent_string = '';
	this.description = '';
	this.children = new Map();

	this.params = [];
	this.options = [];

	this.components = [];
	this.env = '';

	this.path = "";
}

Param = function(name, type, description, _default){
	this.name = name;
	this.type = type;
	this.description = description;
	this._default = _default;
}

Option = function(name, description){
	this.name = name;
	this.description = description;
}



// ECS
var environments = new Map();
var Environment = function(name){
	this.name = name;
	this.components = new Map();
	if(!environments.has(name)){
		environments.set(name, this);
	}else{
		error(`environment (${name}) is aready defined`);
	}
}

var Component = function(name, env, description, params){
	this.name = name;
	this.env = env;
	if(environments.has(env)){
		environments.get(env).components.set(name, this);
	}else{
		error(`environment (${env}) is not defined at component (${name})`);
	}
	this.description = description;
	if(params.length == 0){
		error(`Component (${name}) in environment (${env}) requires params`);
	}
	this.params = params;
}




var current_entity = new Entity();

push_entity = function(target){
	// check for necesary parts
	if(current_entity.name == ''){
		error("entity has no name", target.line);
	}
	if(current_entity.type != "head"){
		if(head != {}){
			if(current_entity.type == "environment" || current_entity.type == "component"){//ECS
				if(current_entity.type == "environment"){
					new Environment(current_entity.name);
				}else if(current_entity.type == "component"){
					var new_comp = new Component(current_entity.name, current_entity.env, current_entity.description, current_entity.params);
				}
			}else{// OOP
				if(current_entity.parent_string != ''){// deeper than a child of head
					// get parents
					var parents_array = [current_entity.parent_string];
					if(current_entity.parent_string.includes('.')){
						parents_array = current_entity.parent_string.split('.');
					}


					// traverse entity tree
					var target = head;
					parents_array.forEach((parent)=>{
						if(target.children.has(parent)){
							target = target.children.get(parent);
						}else{
							error(`parent (${parent}) is not defined in (${current_entity.name})`, current_entity.line);
						}	
					});

					// push entity or error
					if(!target.children.has(current_entity.name)){
						target.children.set(current_entity.name, current_entity);
						current_entity.parent = target;
					}else{
						error(`entity (${current_entity.name}) is already defined in (${current_entity.parent_string})`, current_entity.line);
					}
				}else{// child of head
					if(!head.children.has(current_entity.name)){
						head.children.set(current_entity.name, current_entity);
						current_entity.parent = head;
					}else{
						error(`entity (${current_entity.name}) is already defined`, current_entity.line);
					}
				}
			}
		}else{
			error("Head must be defined first", current_entity.line);
		}
	}else{
		// define head
		head = {...current_entity};
	}

	if(current_entity.path != ""){
		var parent_string = current_entity.parent_string;
		if(parent_string == ""){
			parent_string = current_entity.name;
		}else{
			parent_string += "." + current_entity.name;
		}
		var path = files.getFilePath(file_path) + current_entity.path;
		current_entity = new Entity();
		parse_file(path, parent_string);
	}else{
		current_entity = new Entity();
	}
}

// search for a keyword at a specific location
search_keyword = function(string, cursor, file){
	var found = true;
	for(var i=0; i<string.length;i++){
		if(file[cursor + i] != string[i]){
			found = false;
			break;
		}
	}
	return found;
}


parse_file = function(path, parent){
	virtuosity.cmd.log(path, virtuosity.cmd.color.yellow);
	if(files.fileExists(path)){
		var file = files.readFile(path);
		var file_length = file.length;
		var cursor = 0;
		var current_line = 0;
		var search = false;
		while(cursor < file_length){
			var char = file[cursor];
			if(char == "\n"){
				current_line += 1;
			}
			// makes it easer to use search_keyword();
			var keyword = function(string){
				return search_keyword(string, cursor, file);
			}

			// gets the entire line of a scrybe command
			var get_line = function(){
				var line = "";
				while(file[cursor] != '\n' && !keyword('\r\n') && cursor < file.length){
					line += file[cursor];
					cursor += 1;
				}
				return line;
			}

			if(search){
				/////////////////////////////////////////////////////////
				if(char == "@"){
					if(keyword("@name ")){
						if(current_entity.name == ''){
							cursor += ("@name ").length;
							current_entity.name = get_line();
							current_entity.line = current_line;
						}else{
							cursor -= 1;
							if(current_entity.parent_string != ""){
								if(parent != ""){
									current_entity.parent_string = parent + "." + current_entity.parent_string;
								}
							}else{
								current_entity.parent_string = parent;
							}
							if(current_entity.name != ""){
								push_entity();
							}else{
								current_entity = new Entity();
							}
						}
					}else if(keyword("@type ")){
						cursor += ("@type ").length;
						current_entity.type = get_line();
						if(!current_entity.type.in("head", "object", "obj", "method", "property", "prop", "class", "return", "head", "options", "entity", "component", "environment", 'config')){
							error(`Invalid type (${current_entity.type}) in ${current_entity.name}`, current_entity.line);
						}
						if(current_entity.type == "object"){
							current_entity.type = "obj";
						}else if(current_entity.type == "prop"){
							current_entity.type = "property";
						}
					}else if(keyword("@description ")){
						cursor += ("@description ").length;
						current_entity.description = get_line();
					}else if(keyword("@parent ")){
						cursor += ("@parent ").length;
						current_entity.parent_string = get_line();
					}else if(keyword("@env ")){
						cursor += ("@env ").length;
						current_entity.env = get_line();
					}else if(keyword("@path ")){
						cursor += ("@path ").length;
						current_entity.path = get_line();
					}else if(keyword("@proto ")){
						cursor += ("@proto ").length;
						current_entity.proto = get_line();
					}else if(keyword("@component ")){
						cursor += ("@component ").length;
						current_entity.components.push(get_line());
					}else if(keyword("@option ")){ 
						cursor += ("@option {").length;
						var option_name = '';
						var option_description = '';

						char = file[cursor];
						while(char != '}' && cursor < file.length){
							option_name += char;
							cursor += 1;
							char = file[cursor];
						}

						cursor += 2;
						char = file[cursor];
						while(char != '}' && cursor < file.length){
							option_description += char;
							cursor += 1;
							char = file[cursor];
						}

						current_entity.options.push(new Option(option_name, option_description));
					}else if(keyword("@param ")){
						cursor += ("@param {").length;
						var param_name = '';
						var param_type = '';
						var param_description = '';
						var param_default = '';

						char = file[cursor];
						while(char != '}' && cursor < file.length){
							param_name += char;
							cursor += 1;
							char = file[cursor];
						}

						cursor += 2;
						char = file[cursor];
						while(char != '}' && cursor < file.length){
							param_type += char;
							cursor += 1;
							char = file[cursor];
						}

						cursor += 2;
						char = file[cursor];
						while(char != '}' && cursor < file.length){
							param_description += char;
							cursor += 1;
							char = file[cursor];
						}

						if(file[cursor+1] == "{"){
							cursor += 2;
							char = file[cursor];
							while(char != '}' && cursor < file.length){
								param_default += char;
								cursor += 1;
								char = file[cursor];
							}							
						}

						current_entity.params.push(new Param(param_name, param_type, param_description, param_default));
					}
				}

				//////////////////////////////////////////////////////////
				if(keyword('*/')){
					// stop search as cursor is no longer in comment
					search = false;
					if(current_entity.parent_string != ""){
						if(parent != ''){
							current_entity.parent_string = parent + "." + current_entity.parent_string;
						}
					}else{
						current_entity.parent_string = parent;
					}
					if(current_entity.name != ""){
						push_entity();
					}else{
						current_entity = new Entity();
					}
				}
			}else{
				if(keyword("/*") && file[cursor-1] != "\\"){
					// start search as cursor is in a comment
					search = true;
				}
			}
			cursor += 1;
		}
		console.log(current_line);
	}else{
		error(`File path "${path}" does not exist`);
	}
}


parse_file(file_path, "");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var head_name = head.name;
print = function(target, path){
	var target_components = [];

	if(target.components != []){
		var env = environments.get(target.env);
		target.components.forEach((comp)=>{
			target_components.push(env.components.get(comp));
		});
	}

	var data = {
		title: target.name,
		description: target.description,
		type: target.type,
		path: path,
		head: head_name,
		params: target.params,
		children: target.children,
		components: target_components,
		use_components: environments.size != 0
	}

	var printout = nodehp('./print.nodehp', data);
	if(path == null){
		path = "";
	}
	virtuosity.files.writeFile(print_path + path + ".html", printout);	
}

var entity_list = [];
var entity_search_list = [];
function traverse_tree(target, depth, completed, parent, end){
	if(target != null){
		var str = "";
		for(var i=0; i<depth;i++){
			if(i != depth - 1){
				if(completed.has(i)){
					str += "│  ";
				}else{
					str += "   ";
				}
			}else{
				if(!end){
					str += "├──";
				}else{
					str += "└──";
				}
				
				if(target.children.size != 0){
					str += "┬→";
				}else{
					str += "─→";
				}
			}
		}
		if(parent == null){
			parent = "";
		}

		var color = virtuosity.cmd.color.magenta;
		if(target.type == "obj"){
			color = virtuosity.cmd.color.green;
		}else if(target.type == "method"){
			color = virtuosity.cmd.color.cyan;
		}else if(target.type == "property"){
			color = virtuosity.cmd.color.blue;
		}else if(target.type == "head"){
			color = virtuosity.cmd.backgroundColor.blue;
		}else if(target.type == "class" || target.type == "entity" || target.type == "return"){
			color = virtuosity.cmd.color.yellow;
		}

		virtuosity.cmd.log(str + color + target.name + virtuosity.cmd.backgroundColor.black);


		var str = target.name;
		if(target.name != head.name){
			if(target.parent_string != ""){
				str = target.parent_string + "." + target.name;			
			}
			entity_search_list.push(str);
		}

		if(target.children.size != 0 || target.components.length != 0){
			print(target, parent + target.name);
			entity_list.push(str);
		}
		if(parent == ""){
			parent = target.name + ".";
		}else{
			parent += target.name + ".";
		}
		var count = 0;
		completed.add(depth);
		target.children.forEach((child)=>{
			count += 1;
			var at_end = (count == target.children.size);
			if(at_end){
				completed.delete(depth);
			}
			traverse_tree(child, depth + 1, completed, parent, at_end);
		});
	}
}

console.log("\nEntities Documented");
console.log("--------------------");
traverse_tree(head, 0, new Set());

// css
virtuosity.files.writeFile(print_path + "style.css", virtuosity.files.readFile('./style.css'));

// entity
virtuosity.files.writeFile(print_path + "entity list.JSON", `entity_list=${JSON.stringify(entity_list)}; entity_search_list=${JSON.stringify(entity_search_list)}`);


// components
if(environments.size != 0){
	virtuosity.files.writeFile(print_path + "components.html", nodehp('./components print.nodehp', {
		head: head.name,
		environments: environments
	}));
}