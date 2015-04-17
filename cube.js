//variable initialization:
var gl; //gl variable
var points; //points that we will draw
var vertices; //vertices of cube
var program; //program for shaders
var vBuffer; //buffer
var vPosition; //shader set up
var projectionMatrix

var length = 1; //length of one cube width

window.onload = function init() {
	//set up canvas
	var canvas = document.getElementById("myCanvas");
	gl = WebGLUtils.setupWebGL(canvas);
	//if webgl unavailable
	if (!gl) {
		alert("WebGL is not available.");
	}
	//set up viewport
	gl.viewport(0, 0, canvas.width, canvas.height);
	//set up clear to be black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //enable depth test so depth works
    gl.enable(gl.DEPTH_TEST);

    //create points for the cube and store them:
    //create vertices array to hold 8 vertices for our cube
    vertices = [
    vec3(length, length, length), 
    vec3(length, -length, length), 
    vec3(-length, length, length),
    vec3(-length, -length, length),   
    vec3(length, length, -length), 
    vec3(length, -length, -length), 
    vec3(-length, length, -length), 
    vec3(-length, -length, -length)    
    ];
    //array for the points to be stored
    var points = [];
    //create the cube, one face at a time
    quadFace(vertices, points, 0, 1, 2, 3);
    quadFace(vertices, points, 4, 0, 6, 2);
    quadFace(vertices, points, 4, 5, 0, 1);
    quadFace(vertices, points, 2, 3, 6, 7);
    quadFace(vertices, points, 1, 5, 3, 7);
    quadFace(vertices, points, 6, 7, 4, 5);

    //initialize shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //flatten the points onto a buffer bound to webgl
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    //set up shaders
    vPosition = gl.getAttribLocation(program, "vPosition");
    //make sure using '3' and gl.FLOAT
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //render the image
    render();    
}

//pushes the points to make one face of a cube using two triangles
function quadFace(vertices, points, v1, v2, v3, v4) {
    points.push(vertices[v1]);
    points.push(vertices[v3]);
    points.push(vertices[v4]);
    points.push(vertices[v1]);
    points.push(vertices[v4]);
    points.push(vertices[v2]);
}

function render() {


	gl.clear(gl.COLOR_BUFFER_BIT);
}