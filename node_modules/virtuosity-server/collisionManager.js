//adapted from: https://github.com/davidfig/intersects/

/*
* @name shape
* @type obj
* @description Creating shapes for calculating collision
*/


/*
* @name Point
* @type class
* @description Returns a Point collision shape object
* @parent shape
*/
var Point = function(x, y){
	/*
	* @name x
	* @type property
	* @description x position of the Point [Float]
	* @parent shape.Point
	*/
	this.x = x;

	/*
	* @name y
	* @type property
	* @description y position of the Point [Float]
	* @parent shape.Point
	*/
	this.y = y;


	/*
	* @name position
	* @type method
	* @description Sets the position of the point
	* @parent shape.Point
	* @param {x}{Float}{x position of the Point}
	* @param {y}{Float}{y position of the Point}
	*/
	this.position = function(x, y){
		this.x = x;
		this.y = y;
	}
}


/*
* @name Box
* @type class
* @description Returns a Box collision shape object
* @parent shape
*/
var Box = function(x, y, width, height){
	/*
	* @name x
	* @type property
	* @description x position of the Box [Float]
	* @parent shape.Box
	*/
	this.x = x;

	/*
	* @name y
	* @type property
	* @description y position of the Box [Float]
	* @parent shape.Box
	*/
	this.y = y;

	/*
	* @name width
	* @type property
	* @description width of the Box [Float]
	* @parent shape.Box
	*/
	this.width = width;

	/*
	* @name height
	* @type property
	* @description height of the Box [Float]
	* @parent shape.Box
	*/
	this.hieght = height;

	/*
	* @name position
	* @type method
	* @description Sets the position of the box
	* @parent shape.Box
	* @param {x}{Float}{x position of the Point}
	* @param {y}{Float}{y position of the Point}
	*/
	this.position = function(x, y){
		this.x = x;
		this.y = y;
	}

	/*
	* @name scaling
	* @type method
	* @description Sets the scaling of the box
	* @parent shape.Box
	* @param {width}{Float}{width of the box}
	* @param {height}{Float}{height of the box}
	*/
	this.scaling = function(width, hieght){
		this.width = width;
		this.hieght = height;
	}
}

/*
* @name Circle
* @type class
* @description Returns a Circle collision shape object
* @parent shape
*/
var Circle = function(x, y, r){
	/*
	* @name x
	* @type property
	* @description x position of the Circle [Float]
	* @parent shape.Circle
	*/
	this.x = x;

	/*
	* @name y
	* @type property
	* @description y position of the Circle [Float]
	* @parent shape.Circle
	*/
	this.y = y;

	/*
	* @name r
	* @type property
	* @description radius of the Circle [Float]
	* @parent shape.Circle
	*/
	this.r = r;

	/*
	* @name position
	* @type method
	* @description Sets the position of the box
	* @parent shape.Box
	* @param {x}{Float}{x position of the Circle}
	* @param {y}{Float}{y position of the Circle}
	*/
	this.position = function(x, y){
		this.x = x;
		this.y = y;
	}

	/*
	* @name position
	* @type method
	* @description Sets the position of the box
	* @parent shape.Box
	* @param {r}{Float}{radius of the Circle}
	*/
	this.scaling = function(r){
		this.r = r;
	}
}



/*
* @name Line
* @type class
* @description Returns a Line collision shape object
* @parent shape
*/
var Line = function(x1, y1, x2, y2){
	/*
	* @name x1
	* @type property
	* @description x1 position of the Line [Float]
	* @parent shape.Line
	*/
	this.x1 = x1;

	/*
	* @name y1
	* @type property
	* @description y1 position of the Line [Float]
	* @parent shape.Line
	*/
	this.y1 = y1;

	/*
	* @name x2
	* @type property
	* @description x2 position of the Line [Float]
	* @parent shape.Line
	*/
	this.x2 = x2;

	/*
	* @name y2
	* @type property
	* @description y2 position of the Line [Float]
	* @parent shape.Line
	*/
	this.y2 = y2;


	/*
	* @name width
	* @type property
	* @description width of the Line [Float]
	* @parent shape.Line
	*/
	this.width = 1;


	/*
	* @name position1
	* @type method
	* @description Sets the position of the box
	* @parent shape.Line
	* @param {x1}{Float}{x1 position of the Line}
	* @param {y1}{Float}{y1 position of the Line}
	*/
	this.position1 = function(x1, y1){
		this.x1 = x1;
		this.y1 = y1;
	}

	/*
	* @name position2
	* @type method
	* @description Sets the position of the box
	* @parent shape.Line
	* @param {x2}{Float}{x2 position of the Line}
	* @param {y2}{Float}{y2 position of the Line}
	*/
	this.position2 = function(x2, y2){
		this.x2 = x2;
		this.y2 = y2;
	}




	/*
	* @name scaling
	* @type method
	* @description Sets the width of the line
	* @parent shape.Line
	* @param {width}{Int}{width of the Line}
	*/
	this.scaling = function(width){
		this.width = width;
		if(this.width < 1){
			this.width = 1;
		}
	}
}




/*
* @name Polygon
* @type class
* @description Returns a Polygon collision shape object
* @parent shape
* @param {points}{Array}{points of the Polygon. Can be made up of <a href="./virtuosity.collisionManager.shape.Point.html">Points</a>, arrays setup like: [x, y], or a combination.}
*/
var Polygon = function(points){
	/*
	* @name set
	* @type method
	* @description set Polygon points. Can be made up of <a href="./virtuosity.collisionManager.shape.Point.html">Points</a>, arrays setup like: [x, y], or a combination.
	* @parent shape.Polygon
	*/
	this.set = function(pnts){
		this.points = [];
		pnts.forEach((point)=>{
			if(point instanceof Point){
				this.points.push(point);
			}else{
				this.points.push(new Point(point[0], point[1]));
			}
		});
	}

	/*
	* @name points
	* @type property
	* @description points of the polygon
	* @parent shape.Polygon
	*/
	this.set(points);
}





///////////////////////////////////////////////////////////////////////////////////////////////////////
var distanceSquared = function(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

var dot = function(v1, v2){
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

//point
var point_point = function(a, b){
    return a.x == b.x && a.y == b.y;
}


//box
var box_point = function(a, b){
    return b.x >= a.x && b.x <= a.x + a.width && b.y >= a.y && b.y <= a.y + a.hieght;
}

var box_box = function(a, b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.hieght && a.y + a.hieght > b.y;
}

var box_circle = function(a, b){
    var hw = a.width / 2;
    var hh = a.hieght / 2;
    var distX = Math.abs(b.x - (a.x + a.width / 2));
    var distY = Math.abs(b.y - (a.y + a.hieght / 2));

    if (distX > hw + b.r || distY > hh + b.r){
        return false;
    }

    if (distX <= hw || distY <= hh){
        return true;
    }

    var x = distX - hw;
    var y = distY - hh;
    return x * x + y * y <= b.r * b.r;
}


//circle
var circle_point = function(a, b){
    var x = b.x - a.x;
    var y = b.y - a.y;
    return x * x + y * y <= a.r * a.r;
}

var circle_circle = function(a, b){
    var x = a.x - b.x;
    var y = b.y - a.y;
    var radii = a.r + b.r;
    return x * x + y * y <= radii * radii;
}




//line
var line_point = function(a, b, tolerance){
	tolerance = tolerance || 1;
    return Math.abs(distanceSquared(a.x1, a.y1, a.x2, a.y2) - (distanceSquared(a.x1, a.y1, b.x, b.y) + distanceSquared(a.x2, a.y2, b.x, b.y))) <= tolerance;
}


var line_box = function(a, b){
	if(box_point(b, new Point(a.x1, a.y1)) || box_point(b, new Point(a.x2, a.y2))){
        return true;
    }else{
	    return line_line(a, new Line(xb, yb, xb + wb, yb)) ||
	        line_line(a, new Line(xb + wb, yb, xb + wb, yb + hb)) ||
	        line_line(a, new Line(xb, yb + hb, xb + wb, yb + hb)) ||
	        line_line(a, new Line(xb, yb, xb, yb + hb));
    }
}


var line_circle = function(a, b){
	var ac = [b.x - a.x1, b.y - a.y1];
    var ab = [a.x2 - a.x1, a.y2 - a.y1];
    var ab2 = dot(ab, ab);
    var acab = dot(ac, ab);
    var t = acab / ab2;
    t = (t < 0) ? 0 : t;
    t = (t > 1) ? 1 : t;
    var h = [(ab[0] * t + a.x1) - b.x, (ab[1] * t + a.y1) - b.y];
    var h2 = dot(h, h);
    return h2 <= rc * rc;
}



var line_line = function(a, b){
	if(a.width != 1 || b.width != 1){
		var s1_x = a.x2 - a.x1;
	    var s1_y = a.y2 - a.y1;
	    var s2_x = b.x4 - b.x3;
	    var s2_y = b.y4 - b.y3;
	    var s = (-s1_y * (a.x1 - b.x3) + s1_x * (a.y1 - b.y3)) / (-s2_x * s1_y + s1_x * s2_y);
	    var t = (s2_x * (a.y1 - b.y3) - s2_y * (a.x1 - b.x3)) / (-s2_x * s1_y + s1_x * s2_y);
	    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
	}else{

	}
}


//polygon
var polygon_point = function(a, b, tolerance){
	var length = a.points.length;
    var c = false;
    var i, j;
    for(i = 0, j = length - 2; i < length; i += 1){
        if(((a.points[i].y > b.y) !== (a.points[j].y > b.y)) && (b.x < (a.points[j].x - a.points[i].x) * (b.y - a.points[i].y) / (a.points[j].y - a.points[i].y) + a.points[i].x)){
            c = !c;
        }
        j = i;
    }
    if(c){
        return true;
    }
    for(i = 0; i < length; i += 1){
        var p1x = a.points[i].x;
        var p1y = a.points[i].y;
        var p2x, p2y;
        if(i === length - 1){
            p2x = a.points[0].x;
            p2y = a.points[0].y;
        }else{
            p2x = a.points[i + 1].x;
            p2y = a.points[i + 1].y;
        }
        if(line_point(new Line(p1x, p1y, p2x, p2y), b, tolerance)){
            return true;
        }
    }
    return false; 
}

var polygon_box = function(a,b){
	return polygon_polygon(a, new Polygon(b.x, b.y, b.x + b.width, b.y + b.height));
}



var polygon_circle = function(a, b, tolerance){
	if(polygon_point(a, new Point(b.x, b.y), tolerance)){
        return true;
    }
    var count = a.points.length;
    for(var i = 0; i < count - 1; i += 1){
        if(line_circle(new Line(a.points[i].x, a.points[i].y, a.points[i+1].x, a.points[i+1].y), b)){
            return true;
        }
    }
    return line_circle(new Line(a.points[i].x, a.points[i].y, a.points[count-1].x, a.points[count-1].y), b);
}


var polygon_line = function(a, b, tolerance){
	var length = a.points.length;

    if(polygon_point(a, new Point(b.x1, b.y1), tolerance)){
        return true
    }

    for(var i = 0; i < length; i += 1){
        var j = (i + 1) % length;
        if(line_line(b, new Line(a.points[i].x, a.points[i].y, a.points[i+1].x, a.points[i+1].y))){
            return true;
        }
    }
    return false;
}


var poly_poly_check = function(target, a, b){
	var minA, maxA, projected, minB, maxB, j;
 	for(var i1 = 0; i1 < target.points.length; i1 += 1){
        var i2 = (i1 + 1) % target.points.length;
        var normal = new Point(target.points[i2].y - target.points[i1].y, target.points[i1].x - target.points[i2].x);
        minA = maxA = null;
        for(j = 0; j < a.points.length; j += 1){
            projected = normal.x * a.points[j].x + normal.y * a.points[j].y;
            if(minA === null || projected < minA){
                minA = projected;
            }
            if(maxA === null || projected > maxA){
                maxA = projected;
            }
        }
        minB = maxB = null;
        for(j = 0; j < b.points.length; j += 2){
            projected = normal.x * b.points[j].x + normal.y * b.points[j].y
            if(minB === null || projected < minB){
                minB = projected;
            }
            if(maxB === null || projected > maxB){
                maxB = projected;
            }
        }
        if(maxA < minB || maxB < minA){
            return false;
        }
    }
}

var polygon_polygon = function(a, b){
	var check1 = poly_poly_check(a, a, b);
	if(check1 != null){
		return check1;
	}

	var check2 = poly_poly_check(b, a, b);
	if(check2 != null){
		return check2;
	}
    return true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
	shape: {
		Point: function(x, y){
			return new Point(x, y);	
		},
		Box: function(x, y, w, h){
			return new Box(x, y, w, h);
		},
		Circle: function(x, y, r){
			return new Circle(x, y, r);
		},
		Line: function(x1, y1, x2, y2){
			return new Line(x1, y1, x2, y2);
		},
		Polygon: function(points){
			return new Polygon(points);
		}
	},

	/*
	* @name collision
	* @type obj
	* @description returns collision betweens shapes two shapes
	*/
	collision: {
		/*
		* @name auto
		* @type method
		* @description Check if two collision objects are colliding. Automatically decided which collision function to use.
		* @parent collision
		* @param {a}{<a href="virtuosity.collisionManager.shape.hieghttml">any collision object</a>}{first object to check collision}
		* @param {a}{<a href="virtuosity.collisionManager.shape.hieghttml">any collision object</a>}{second object to check collision}
		*/
		auto: function(a, b){
			if(a instanceof Point){
				if(b instanceof Point){
					return point_point(a, b);
				}else if(b instanceof Box){
					return box_point(b, a);
				}else if(b instanceof Circle){
					return circle_point(b, a);
				}else if(b instanceof Line){
					return line_point(b, a);
				}else if(b instanceof Polygon){
					return polygon_point(b, a);
				}
			}else if(a instanceof Box){
				if(b instanceof Point){
					return box_point(a, b);
				}else if(b instanceof Box){
					return box_box(a, b);
				}else if(b instanceof Circle){
					return box_circle(a, b);
				}else if(b instanceof Line){
					return line_box(b, a);
				}else if(b instanceof Polygon){
					return polygon_box(b, a);
				}
			}else if(a instanceof Circle){
				if(b instanceof Point){
					return circle_point(a, b);
				}else if(b instanceof Box){
					return box_circle(b, a);
				}else if(b instanceof Circle){
					return circle_circle(a, b);
				}else if(b instanceof Line){
					return line_circle(b, a);
				}else if(b instanceof Polygon){
					return polygon_circle(b, a);
				}
			}else if(a instanceof Line){
				if(b instanceof Point){
					return line_point(a, b);
				}else if(b instanceof Box){
					return line_box(b, a);
				}else if(b instanceof Circle){
					return line_circle(a, b);
				}else if(b instanceof Line){
					return line_line(a, b);
				}else if(b instanceof Polygon){
					return polygon_line(b, a);
				}
			}else if(a instanceof Polygon){
				if(b instanceof Point){
					return polygon_point(a, b);
				}else if(b instanceof Box){
					return polygon_box(a, b);
				}else if(b instanceof Circle){
					return polygon_circle(a, b);
				}else if(b instanceof Line){
					return polygon_line(a, b);
				}else if(b instanceof Polygon){
					return polygon_polygon(a, b);
				}
			}
		},



		/*
		* @name pointPoint
		* @type method
		* @description Returns true if a Point and a Point are colliding.
		* @parent collision
		* @param {a}{Point}{first object to check collision}
		* @param {b}{Point}{second object to check collision}
		*/
		pointPoint: function(a, b){
			return point_point(a, b);
		},

		/*
		* @name pointBox
		* @type method
		* @description Returns true if a Point and a Box are colliding.
		* @parent collision
		* @param {a}{Point}{first object to check collision}
		* @param {b}{Box}{second object to check collision}
		*/
		pointBox: function(a, b){
			return box_point(b, a);
		},

		/*
		* @name pointCircle
		* @type method
		* @description Returns true if a Point and a Circle are colliding.
		* @parent collision
		* @param {a}{Point}{first object to check collision}
		* @param {b}{Circle}{second object to check collision}
		*/
		pointCircle: function(a, b){
			return circle_point(b, a);
		},

		/*
		* @name pointLine
		* @type method
		* @description Returns true if a Point and a Line are colliding.
		* @parent collision
		* @param {a}{Point}{first object to check collision}
		* @param {b}{Line}{second object to check collision}
		*/
		pointLine: function(a, b){
			return line_point(b, a);
		},

		/*
		* @name pointPolygon
		* @type method
		* @description Returns true if a Point and a Polygon are colliding.
		* @parent collision
		* @param {a}{Point}{first object to check collision}
		* @param {b}{Polygon}{second object to check collision}
		*/
		pointPolygon: function(a, b){
			return line_point(b, a);
		},

		///////////////////////////////////////////////////////////////////////////////////////////////////////
		/*
		* @name boxPoint
		* @type method
		* @description Returns true if a Box and a Point are colliding.
		* @parent collision
		* @param {a}{Box}{first object to check collision}
		* @param {b}{Point}{second object to check collision}
		*/
		boxPoint: function(a, b){
			return box_point(a, b);
		},

		/*
		* @name boxBox
		* @type method
		* @description Returns true if a Box and a Box are colliding.
		* @parent collision
		* @param {a}{Box}{first object to check collision}
		* @param {b}{Box}{second object to check collision}
		*/
		boxBox: function(a, b){
			return box_box(a, b);
		},

		/*
		* @name boxCircle
		* @type method
		* @description Returns true if a Box and a Circle are colliding.
		* @parent collision
		* @param {a}{Box}{first object to check collision}
		* @param {b}{Circle}{second object to check collision}
		*/
		boxCircle: function(a, b){
			return box_circle(a, b);
		},

		/*
		* @name boxLine
		* @type method
		* @description Returns true if a Box and a Line are colliding.
		* @parent collision
		* @param {a}{Box}{first object to check collision}
		* @param {b}{Line}{second object to check collision}
		*/
		boxLine: function(a, b){
			return line_box(b, a);
		},

		/*
		* @name boxPolygon
		* @type method
		* @description Returns true if a Box and a Polygon are colliding.
		* @parent collision
		* @param {a}{Box}{first object to check collision}
		* @param {b}{Polygon}{second object to check collision}
		*/
		boxPolygon: function(a, b){
			return line_box(b, a);
		},

		///////////////////////////////////////////////////////////////////////////////////////////////////////
		/*
		* @name circlePoint
		* @type method
		* @description Returns true if a Circle and a Point are colliding.
		* @parent collision
		* @param {a}{Circle}{first object to check collision}
		* @param {b}{Point}{second object to check collision}
		*/
		circlePoint: function(a, b){
			return circle_point(a, b);
		},

		/*
		* @name circleBox
		* @type method
		* @description Returns true if a Circle and a Box are colliding.
		* @parent collision
		* @param {a}{Circle}{first object to check collision}
		* @param {b}{Box}{second object to check collision}
		*/
		circleBox: function(a, b){
			return box_circle(b, a);
		},

		/*
		* @name circleCircle
		* @type method
		* @description Returns true if a Circle and a Circle are colliding.
		* @parent collision
		* @param {a}{Circle}{first object to check collision}
		* @param {b}{Circle}{second object to check collision}
		*/
		circleCircle: function(a, b){
			return circle_circle(a, b);
		},

		/*
		* @name circleLine
		* @type method
		* @description Returns true if a Line and a Line are colliding.
		* @parent collision
		* @param {a}{Circle}{first object to check collision}
		* @param {b}{Line}{second object to check collision}
		*/
		circleLine: function(a, b){
			return line_circle(b, a);
		},

		/*
		* @name circlePolygon
		* @type method
		* @description Returns true if a Polygon and a Polygon are colliding.
		* @parent collision
		* @param {a}{Circle}{first object to check collision}
		* @param {b}{Polygon}{second object to check collision}
		*/
		circlePolygon: function(a, b){
			return line_circle(b, a);
		},
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		/*
		* @name linePoint
		* @type method
		* @description Returns true if a Line and a Point are colliding.
		* @parent collision
		* @param {a}{Line}{first object to check collision}
		* @param {b}{Point}{second object to check collision}
		*/
		linePoint: function(a, b){
			return line_point(a, b);
		},

		/*
		* @name lineBox
		* @type method
		* @description Returns true if a Line and a Box are colliding.
		* @parent collision
		* @param {a}{Line}{first object to check collision}
		* @param {b}{Box}{second object to check collision}
		*/
		lineBox: function(a, b){
			return line_box(a, b);
		},

		/*
		* @name lineCircle
		* @type method
		* @description Returns true if a Line and a Circle are colliding.
		* @parent collision
		* @param {a}{Line}{first object to check collision}
		* @param {b}{Circle}{second object to check collision}
		*/
		lineCircle: function(a, b){
			return line_circle(a, b);
		},

		/*
		* @name lineLine
		* @type method
		* @description Returns true if a Line and a Line are colliding.
		* @parent collision
		* @param {a}{Line}{first object to check collision}
		* @param {b}{Line}{second object to check collision}
		*/
		lineLine: function(a, b){
			return line_line(a, b);
		},

		/*
		* @name linePolygon
		* @type method
		* @description Returns true if a Polygon and a Polygon are colliding.
		* @parent collision
		* @param {a}{Line}{first object to check collision}
		* @param {b}{Polygon}{second object to check collision}
		*/
		linePolygon: function(a, b){
			return line_line(a, b);
		},

		///////////////////////////////////////////////////////////////////////////////////////////////////////
		/*
		* @name polygonPoint
		* @type method
		* @description Returns true if a Polygon and a Point are colliding.
		* @parent collision
		* @param {a}{Polygon}{first object to check collision}
		* @param {b}{Point}{second object to check collision}
		*/
		polygonPoint: function(a, b){
			return polygon_point(a, b);
		},

		/*
		* @name polygonBox
		* @type method
		* @description Returns true if a Polygon and a Box are colliding.
		* @parent collision
		* @param {a}{Polygon}{first object to check collision}
		* @param {b}{Box}{second object to check collision}
		*/
		polygonBox: function(a, b){
			return polygon_box(a, b);
		},

		/*
		* @name polygonCircle
		* @type method
		* @description Returns true if a Polygon and a Circle are colliding.
		* @parent collision
		* @param {a}{Polygon}{first object to check collision}
		* @param {b}{Circle}{second object to check collision}
		*/
		polygonCircle: function(a, b){
			return polygon_circle(a, b);
		},

		/*
		* @name polygonLine
		* @type method
		* @description Returns true if a Line and a Line are colliding.
		* @parent collision
		* @param {a}{Polygon}{first object to check collision}
		* @param {b}{Line}{second object to check collision}
		*/
		polygonLine: function(a, b){
			return polygon_polygon(a, b);
		},

		/*
		* @name polygonPolygon
		* @type method
		* @description Returns true if a Polygon and a Polygon are colliding.
		* @parent collision
		* @param {a}{Polygon}{first object to check collision}
		* @param {b}{Polygon}{second object to check collision}
		*/
		polygonPolygon: function(a, b){
			return polygon_polygon(a, b);
		}
	}
}