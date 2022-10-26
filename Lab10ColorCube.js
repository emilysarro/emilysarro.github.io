"use strict";

var canvas;
var gl;

var tParam = 0.0;
var tLoc;
var DeltaT = 0.01;

var numPositions  = 144;

var positions = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var flag = false;

var axis = 0;
var theta = [0, 0, 0];

var delay = 100;
var morph = true;

var thetaLoc;

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

colorObj();
   


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);


    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ipositions), gl.STATIC_DRAW);


    var ipositionLoc = gl.getAttribLocation(program, "iPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ipositionLoc);

tLoc = gl.getUniformLocation(program, "t");

colorLoc = gl.getUniformLocation(program, "inColor" );

    thetaLoc = gl.getUniformLocation(program, "uTheta");

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

document.getElementById("TButton").onclick = function(){flag = !flag;};

    render();
}


function colorObj()

{

  for (var cubeNum=0; cubeNum<=1; cubeNum++)

    {

      for (var obj=0; obj<=3; obj++)

      {
//for I

        quad(1+8*obj, 0+8*obj, 3+8*obj, 2+8*obj, cubeNum);

        quad(2+8*obj, 3+8*obj, 7+8*obj, 6+8*obj, cubeNum);

        quad(3+8*obj, 0+8*obj, 4+8*obj, 7+8*obj, cubeNum);

        quad(6+8*obj, 5+8*obj, 1+8*obj, 2+8*obj, cubeNum);

        quad(4+8*obj, 5+8*obj, 6+8*obj, 7+8*obj, cubeNum);

        quad(5+8*obj, 4+8*obj, 0+8*obj, 1+8*obj, cubeNum);

//for U

quad2(1+8*obj, 0+8*obj, 3+8*obj, 2+8*obj, cubeNum);

        quad2(2+8*obj, 3+8*obj, 7+8*obj, 6+8*obj, cubeNum);

        quad2(3+8*obj, 0+8*obj, 4+8*obj, 7+8*obj, cubeNum);

        quad2(6+8*obj, 5+8*obj, 1+8*obj, 2+8*obj, cubeNum);

        quad2(4+8*obj, 5+8*obj, 6+8*obj, 7+8*obj, cubeNum);

        quad2(5+8*obj, 4+8*obj, 0+8*obj, 1+8*obj, cubeNum);

      }

    }
}
function quad1(a, b, c, d, cubeNum)
{
    var vertices = [

	vec4(-0.75, -0.15,  0.75, 1.0),
        vec4(-0.75,  -0.6,  0.75, 1.0),
        vec4(0.75,  -0.6,  0.75, 1.0),
        vec4(0.75, -0.15,  0.75, 1.0),
        vec4(-0.75, -0.15, 0.5, 1.0),
        vec4(-0.75,  -0.6, 0.5, 1.0),
        vec4(0.75,  -0.6, 0.5, 1.0),
        vec4(0.75, -0.15, 0.5, 1.0),

        vec4(-0.15, 0.75,  0.75, 1.0),
        vec4(-0.15,  -0.15,  0.75, 1.0),
        vec4(0.15,  -0.15,  0.75, 1.0),
        vec4(0.15, 0.75,  0.75, 1.0),
        vec4(-0.15, 0.75, 0.5, 1.0),
        vec4(-0.15,  -0.15, 0.5, 1.0),
        vec4(0.15,  -0.15, 0.5, 1.0),
        vec4(0.15, 0.75, 0.5, 1.0),

	vec4(-0.75, 0.75,  0.75, 1.0),
        vec4(-0.75,   0.5,  0.75, 1.0),
        vec4(-0.15,   0.5,  0.75, 1.0),
        vec4(-0.15, 0.75,  0.75, 1.0),
        vec4(-0.75, 0.75, 0.5, 1.0),
        vec4(-0.75,   0.5, 0.5, 1.0),
        vec4(-0.15,   0.5, 0.5, 1.0),
        vec4(-0.15, 0.75, 0.5, 1.0),

       vec4(0.75, 0.75,  0.75, 1.0),
        vec4(0.75,   0.5,  0.75, 1.0),
        vec4(0.15,   0.5,  0.75, 1.0),
        vec4(0.15, 0.75,  0.75, 1.0),
        vec4(0.75, 0.75, 0.5, 1.0),
        vec4(0.75,   0.5, 0.5, 1.0),
        vec4(0.15,   0.5, 0.5, 1.0),
        vec4(0.15, 0.75, 0.5, 1.0)
    ];

    var vertexColors = [
       vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan

vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan

vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan

vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan
      
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [a, b, c, a, c, d];

    for ( var i = 0; i < indices.length; ++i ) {
       positions.push( vertices[indices[i]] );
       // colors.push( vertexColors[indices[i]] );


        // for solid colored faces use
        colors.push(vertexColors[a]);
    }
}

//u object

function quad2(a, b, c, d, cubeNum)
{
    var vertices2 = [

	vec4(-0.75, -0.15,  0.75, 1.0),
        vec4(-0.75,  -0.6,  0.75, 1.0),
        vec4(0.75,  -0.6,  0.75, 1.0),
        vec4(0.75, -0.15,  0.75, 1.0),
        vec4(-0.75, -0.15, 0.5, 1.0),
        vec4(-0.75,  -0.6, 0.5, 1.0),
        vec4(0.75,  -0.6, 0.5, 1.0),
        vec4(0.75, -0.15, 0.5, 1.0),

        vec4(-0.15, -0.15,  0.75, 1.0),
        vec4(-0.15,  -0.15,  0.75, 1.0),
        vec4(0.15,  -0.15,  0.75, 1.0),
        vec4(0.15, -0.15,  0.75, 1.0),
        vec4(-0.15,-0.15, 0.5, 1.0),
        vec4(-0.15,  -0.15, 0.5, 1.0),
        vec4(0.15,  -0.15, 0.5, 1.0),
        vec4(0.15, -0.15, 0.5, 1.0),

	vec4(-0.75, 0.75,  0.75, 1.0),
        vec4(-0.75,  -0.15,  0.75, 1.0),
        vec4(-0.15,   -0.15,  0.75, 1.0),
        vec4(-0.15, 0.75,  0.75, 1.0),
        vec4(-0.75, 0.75, 0.5, 1.0),
        vec4(-0.75,   -0.15, 0.5, 1.0),
        vec4(-0.15,   -0.15, 0.5, 1.0),
        vec4(-0.15, 0.75, 0.5, 1.0),

       vec4(0.75, 0.75,  0.75, 1.0),
        vec4(0.75,   -0.15,  0.75, 1.0),
        vec4(0.15,   -0.15,  0.75, 1.0),
        vec4(0.15, 0.75,  0.75, 1.0),
        vec4(0.75, 0.75, 0.5, 1.0),
        vec4(0.75,   -0.15, 0.5, 1.0),
        vec4(0.15,   -0.15, 0.5, 1.0),
        vec4(0.15, 0.75, 0.5, 1.0)
    ];

    var vertexColors2 = [
       vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan

vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan

vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan

vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
	//vec4(1.0, 1.0, 1.0, 1.0),   // white
vec4(0.0, 1.0, 1.0, 1.0),  // cyan
      
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [a, b, c, a, c, d];

    for ( var i = 0; i < indices.length; ++i ) {
       positions.push( vertices2[indices[i]] );
       // colors.push( vertexColors2[indices[i]] );


        // for solid colored faces use
        colors.push(vertexColors2[a]);
    }
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (flag) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

if (morph) tParam += DeltaT;
	if (tParam>=1.0 || tParam<= 0.0)
	DeltaT = -DeltaT;
	gl.uniform1f(tLoc, tParam);

    gl.drawArrays(gl.TRIANGLES, 0, numPositions);
gl.drawArrays(gl.LINES, numPositions, 6);
    requestAnimationFrame(render);

setTimeout(
	function (){
requestAnimationFrame(render);
}, delay);

}
