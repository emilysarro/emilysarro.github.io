"use strict";
var canvas;
var gl;
var vertices;
var positions;
var numtimesubdiv = 0;
var bufferId;


function init(){

canvas = document.getElementById("gl-canvas");

   gl = canvas.getContext('webgl2');
   if (!gl) alert( "WebGL 2.0 isn't available" );


gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);


 var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
  };

render();
};

//function line(a,b){
//positions.push(a,b);
//}


function render() {

vertices = [
	vec2(-.99,0.0),
	vec2(.99,0.0)];
positions = [];
 positions.push(vertices);  
 //positions = [];
gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear( gl.COLOR_BUFFER_BIT );
gl.drawArrays(gl.POINTS, 0,vertices.length);
    gl.drawArrays(gl.LINES, 0,vertices.length);
    positions = [];
}

