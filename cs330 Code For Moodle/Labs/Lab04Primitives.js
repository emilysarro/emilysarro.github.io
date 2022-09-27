"use strict";
var gl;
var points;
init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    points=[
    vec2( -0.95 , -0.95 ),
    vec2(  0.00 , -0.55 ),
    vec2(  0.85 , -0.85 ),
    vec2(  0.75 , -0.25 ),
    vec2(  0.25 ,  0.25 ),
    vec2( -0.35 , -0.65 ),
    vec2( -0.75 ,  0.45 ),
    vec2(  0.00 ,  0.75 ),
    vec2( -0.35 ,  0.45 )
    ];
    
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.drawArrays( gl.POINTS, 0, points.length ); //This gives what I would expect. 
	//There are large points on the canvas.
    //gl.drawArrays( gl.LINES, 0, points.length ); //This gives just the lines, the points are not defined. 
	//The lines are connecting two points, based on the order that the points are established. 
	//One of the points is not connected because there are an odd amount of points.
    //gl.drawArrays( gl.LINE_STRIP, 0, points.length ); //This connects all the points given.
	// The lines connects the points in the order that they are given.
	//Beginning and end points are not connected.
   // gl.drawArrays( gl.LINE_LOOP, 0, points.length ); //This connects all the points given.
	// The lines connects the points in the order that they are given.
	//Beginning and end points are connected.
    //gl.drawArrays( gl.TRIANGLES, 0, points.length ); // This creates three filled in triangles.
	//The triangles are established based on the order the points are entered.
    //gl.drawArrays( gl.TRIANGLE_STRIP, 0, points.length ); //This creates a mess of triangles on the canvas.
	//because the shape is concave, the strip overlaps other points, making the individual triangles difficult to see
    gl.drawArrays( gl.TRIANGLE_FAN, 0, points.length ); //This option also creates a confusing combination of triangles.
	// Again, because the shape is concave, the common vertex creates a confusing array of triangles.
}
