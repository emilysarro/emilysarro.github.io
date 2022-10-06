//For this assignment, I compared my code for the 3rd homework assignment, and some of the labs
//we worked on previously. I also used code (& pseudocode) that we discussed in class.

"use strict";
var gl;
var vertices;
var numtimesubdiv = 0;
var bufferId;

var canvas;

init();

function init(){

var canvas = document.getElementById("gl-canvas");

   gl = canvas.getContext('webgl2');
   if (!gl) alert( "WebGL 2.0 isn't available" );


gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram( program );

bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);


 var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

document.getElementById("slider").onchange = function(event) {
        numtimesubdiv = parseInt(event.target.value);
        render();
  };

render();
};

function divFlake(left, right, count){

	var sqrt3d2 = 0.87;
	var vertex1 = mix(left, right, 0.33);
	var vertex2 = mix(left, right, 0.67);

if (count==0){
	vertices.push(left);
	vertices.push(vertex1);
	vertices.push(vertex1);
	vertices.push(vertex2);
	vertices.push(vertex2);
	vertices.push(right);} 
else{
	var length = vertex2[0] - vertex1[0];
	var top = vec2(vertex1[0] + length/2, length*sqrt3d2);
	
	
    vertices.push(vertex1);
    vertices.push(top);
    vertices.push(top);
    vertices.push(vertex2);
    --count;

   divFlake(left,vertex1,count);
   divFlake(vertex2, right, count);
    }

}

function render() {

vertices = [];

var left = vec2( -1.0 , 0.0);
 var right = vec2( 1.0 , 0.0);

divFlake(left,right,numtimesubdiv);

gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.LINES, 0,vertices.length);
    vertices = [];
}

