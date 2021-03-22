# Scrybe
Auto documentation tool designed for use in javascript libraries, creating a documentation website. This webpage has built in mobile support, search bar, and darkmode. There is also built in support for [ECS](https://en.wikipedia.org/wiki/Entity_component_system).

It is similar to [JSDoc](https://www.npmjs.com/package/jsdoc), but was created for use for a multi-file library.
A knowledge of HTML could be helpful as it takes the descriptions directy into HTML files.

## Download Scrybe
Install via [npm](https://www.npmjs.com):

```bash
npm install scrybe
```

## Usage
```bash
$ node scrybe
```
This will print out to the console the files used, as well as a color coded tree of the library printed.\
These types will be described [later](#@type)
- green = object
- yellow = class
- cyan = method
- blue = property
- purple = options

### Arguments

#### `-f` or `-file`
Points Scrybe to header file

#### `-p` or `-print`
Location to put the created documentation HTML files



## HTML manipulation of descriptions

For examle, `<a>`  or `<img>` tags could be used to enhance the descriptions. Properties that this works with are denoted by `Supports HTML manipulation` in the description.\
For code, you can use `<span class="code"></span>`. There are also some built in color classes (based on the monokai color scheme) which are used in the rest of the page:
- red
- orange
- yellow
- green
- blue
- purple
- white


## API

#### Example:
```js
/*
* @name example
* @type method
* @description this is the description of the example method
* @param {ex}{String}{example description of parameter}
*/
```
All of scrybe code should be within a multiline comment like shown above. Multiple scrybe entities can be within one multiline comment.



### @name
#### Required 
Name of the entity. 

### @type
#### Required
Type of the entity.

- obj / object
- method
- prop / property
- class
- return
- head
- options
- entity
- component


The `head` type is used for the library description. It should be the first scrybe command in the file given with the `-f` or `-file` command.\
The `return` type is used for classes that can only be created by the user with a function rather than with the `new` keyword.\
The `options` type is used if the parameter needs to have it's options described. For example, a config object. An `options` type can have `@param` or `@option` (described later), but not both types at the same time.\
The `entity` and `component` types are used for classes that are ECS based, such as using a library like [escs](https://www.npmjs.com/package/escs).

### @description
`Supports HTML manipulation`\
Description of the entity.

### @param
Describes a parameter of the entity\
`Supports HTML manipulation`
```js
/*
@param {name of parameter}{type of parameter}{description of parameter}
*/
```
Optionally, you can have a fourth command: parameter default. This will have automatic stylization (described [below](#types));
```js
/*
@param {name of parameter}{type of parameter}{description of parameter}{parameter default}
*/
```



### @option
Unique to the `options` type. Describes a parameter option\
`Supports HTML manipulation`
```js
/*
@option {parameter option}{description of parameter option}
*/
```

### @parent
Gives the parent of the entity. For example, if this were the code:
```js
parent = {
	child: {
		grandchild: ()=>{}
	}
}
```
The child would have the parent:
```js
/*
* @parent parent
*/
```
The grandchild would have the parent:
```js
/*
* @parent parent.child
*/
```

The parenting is only in relative to the that file. If it isn't in the header file as it was past over by @path (see next), the pathed entity is automatically added.\
If you have a scrybe command that calls a parent, that parent command must be earlier.


### @path
Tells Scrybe that there are children of this object are located in the file at this path. Automatically adds this entity and the parents of this entity as parents to all scrybe commands in the the following file. You can still add parents to scrybe commands.


### @proto
Used specifically for a type `property`, and is used to describe the propery [type](#types).

### @component
Used to add a component to a type `entity`.


## types
When describing types for properties, parameters, etc. there are some built in types that will have automatic stylization:
- Int
- Number
- String
- Function
- Object
- Boolean

You do not have to use the types given, and can use your own and it `Supports HTML manipulation`.\
A comma (without spaces) can be used to have multiple types.\
Placing [] around the type will denote an array with automatic stylization.

When describing default values, stylization will be automatically added if it matches one of the above built in types.\
Placing `""` or `''` around the value will denote a string.