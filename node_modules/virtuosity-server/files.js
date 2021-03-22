var fs = require("fs");
var node_path = require('path');


var read_file = function(path, asyncronous){
    if(asyncronous == null || asyncronous == false){
        return fs.readFileSync(path, 'utf8');
    }else{
        return fs.readFile(path, 'utf8');
    }
}

var write_file = function(path, output, asyncronous){
    if(asyncronous == null || asyncronous == false){
        fs.writeFileSync(path, output);
    }else{
        fs.writeFile(path, output);
    }
}


var delete_file = function(path){
    fs.unlinkSync(path);
}

var copy_file = function(path, destination){
    fs.copyFileSync(path, destination);
}


var file_exists = function(path){
    return fs.existsSync(path);
}


var create_directory = function(path){
    try{
        fs.mkdirSync(path);
    }catch(e){
        if(e.message.substr(0, 34) == "EEXIST: file already exists, mkdir"){
            console.info("Directory already exists (" + path + ")");
        }else{
            throw Error(e);
        }
    }
}

var get_file_extention = function(path){
    var str = node_path.extname(path);
    return str.slice(1, str.length);
}

var get_file_name = function(path){
    return path.replace(/\//g,"\\").replace(/^.*[\\\/]/, '');
}

var get_file_name_without_extention = function(path){
    var name = get_file_name(path);
    var ext = get_file_extention(path);
    if(ext != ""){
        return name.slice(0, name.length - ext.length - 1);
    }else{
        return name;
    }
}

var get_file_path = function(path){
    return path.slice(0, path.length - get_file_name(path).length);
}

var get_file_path_up_directory = function(path){
    if(path[path.length-1] == ("/" || "\\" )){
        path = path.slice(0, path.length-1);
    }
    var current_dir = path.split('/').pop();
    if(current_dir == path){
        current_dir = path.split('\\').pop();
    }
    return path.slice(0, path.length-current_dir.length);
}


var get_files = function(path, depth){
    if(depth == null){
        depth = Infinity;
    }
    return get_files_recursive(path, depth);
}

var get_files_recursive = function(path, depth){
    try{
        if(depth > -1){
            var output = [];

            fs.readdirSync(path, {
                withFileTypes: true
            }).forEach((file)=>{
                if(!file.isFile()){//folder
                    output.push({
                        name: file.name,
                        type: "folder",
                        dir: get_files_recursive(path + "/" + file.name, depth-1)
                    });
                }else{//file
                    output.push({
                        name: get_file_name_without_extention(file.name),
                        type: "." + get_file_extention(file.name)
                    });
                }
            });

            if(output.length != 0){
                return output;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }catch(e){
        return {
            type: "error",
            name: e
        }
    }
}


var delete_folder = function(location){
    if(fs.existsSync(location)){
        fs.readdirSync(location).forEach((file, index) => {
            const curPath = node_path.join(location, file);
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                delete_folder(curPath);
            }else{ // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(location);
    }
}


var rename_file = function(path, name){
    fs.renameSync(path, name);
}


/*
* @name WriteStream
* @type class
* @description file write stream
* @param {path}{String}{path}
*/
var WriteStream = function(path){
    this.DATA = {
        path: path,
        open: true,
        stream: fs.createWriteStream(path)
    }


    var old_file = read_file(path);
    this.DATA.stream.write(old_file);

    /*
    * @name path
    * @type property
    * @proto String
    * @description path of the WriteStream
    * @parent WriteStream
    */
    Object.defineProperty(this, "path", {
        get: ()=>{
            return this.DATA.path;
        }
    });

    /*
    * @name open
    * @type property
    * @proto Boolean
    * @description if the WriteStream is open
    * @parent WriteStream
    */
    Object.defineProperty(this, "open", {
        get: ()=>{
            return this.DATA.open;
        }
    });


    /*
    * @name write
    * @type method
    * @description writes to the WriteStream
    * @parent WriteStream
    */
    this.write = function(output){
        if(this.open){
            this.DATA.stream.write(output);
        }else{
            console.error("Cannot write to a closed WriteStream");
        }
    }

    /*
    * @name close
    * @type method
    * @description closes to the WriteStream
    * @parent WriteStream
    */
    this.close = function(){
        this.DATA.stream.close();
        this.open = false;
    }
}



var ReadStream = function(path){
    this.DATA = fs.createReadStream(path);


    Object.defineProperty(this, 'open', {
        get: ()=>{
            return this.DATA.open;
        }
    })

    this.read = function(){
        if(this.open){
            return this.DATA.read();
        }
    }
}





module.exports = {
    /*
    * @name readFile
    * @type method
    * @description readFile 
    * @param {path}{String}{path}
    * @param {asyncronous}{Boolean}{(OPTIONAL) read file asyncronously}
    */
    readFile: function(path, asyncronous){
        return read_file(path, asyncronous);
    },

    /*
    * @name writeFile
    * @type method
    * @description writeFile 
    * @param {path}{String}{path}
    * @param {output}{String}{output}
    * @param {asyncronous}{Boolean}{(OPTIONAL) write file asyncronously}
    */
    writeFile: function(path, output, asyncronous){
        write_file(path, output, asyncronous);
    },

    /*
    * @name deleteFile
    * @type method
    * @description deleteFile 
    * @param {path}{String}{path}
    */
    deleteFile: function(path){
        delete_file(path);
    },


    /*
    * @name copyFile
    * @type method
    * @description copyFile
    * @param {path}{String}{path}
    * @param {destination}{String}{desination}    
    */
    copyFile: function(path, destination){
        copy_file(path, destination);
    },

    /*
    * @name fileExists
    * @type method
    * @description fileExists 
    * @param {path}{String}{path}
    */
    fileExists: function(path){
        return file_exists(path);
    },

    /*
    * @name createDirectory
    * @type method
    * @description createDirectory 
    * @param {path}{String}{path}
    */
    createDirectory: function(path){
        create_directory(path);
    },

    /*
    * @name getFileExtention
    * @type method
    * @description getFileExtention 
    * @param {path}{String}{path}
    */
    getFileExtention: function(path){
        return get_file_extention(path);
    },

    /*
    * @name getFileName
    * @type method
    * @description getFileName 
    * @param {path}{String}{path}
    */
    getFileName: function(path){
        return get_file_name(path);
    },

    /*
    * @name getFileNameWithoutExtention
    * @type method
    * @description getFileNameWithoutExtention 
    * @param {path}{String}{path}
    */
    getFileNameWithoutExtention: function(path, depth){
        return get_file_name_without_extention(path, depth);
    },



    /*
    * @name getFiles
    * @type method
    * @description getFiles
    * @param {path}{String}{path}
    */
    getFiles: function(path, depth){
        return get_files(path, depth);
    },


    /*
    * @name getFilePath
    * @type method
    * @description getFilePath 
    * @param {path}{String}{path}
    */
    getFilePath: function(path){
        return get_file_path(path);
    },


    /*
    * @name getFilePathUpDirectory
    * @type method
    * @description getFilePathUpDirectory 
    * @param {path}{String}{path}
    */
    getFilePathUpDirectory: function(path){
        return get_file_path_up_directory(path);
    },

    /*
    * @name deleteFolder
    * @type method
    * @description deleteFolder 
    * @param {location}{String}{location}
    */
    deleteFolder: function(location){
        delete_folder(location);
    },

    /*
    * @name renameFile
    * @type method
    * @description renameFile 
    * @param {path}{String}{path}
    */
    renameFile: function(path, name){
        rename_file(path, name);
    },

    /*
    * @name renameDirectory
    * @type method
    * @description renameDirectory 
    * @param {path}{String}{path}
    */
    renameDirectory: function(path, name){
        //same function as renameFile
        rename_file(path, name);
    },

    WriteStream: WriteStream,
    ReadStream: ReadStream
}