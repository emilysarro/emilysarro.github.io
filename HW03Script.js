"use strict";
var gl;
var ipoints;
var upoints;

var tParam = 0.0;
var tLoc;
var DeltaT = 0.01;

var color = vec4(1.0, 0.65, 0.0, 1.0);

var icolor = vec4(1.0, 0.0, 0.0, 1.0);
var ucolor = vec4(0.0, 0.0, 1.0, 1.0);
var colorLoc;

var delay = 100;
var morph = true;

init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    ipoints=[
    vec2( -0.5 , 0.75 ),
    vec2(  0.5 , 0.75 ),
    vec2(  0.5 , 0.5 ),
    vec2(  0.15 , 0.5 ),
    vec2(  0.15 ,  -0.35 ),
    vec2( 0.5 , -0.35 ),
    vec2( 0.5 ,  -0.60 ),
    vec2(  -0.5 ,  -0.60 ),
    vec2( -0.5 ,  -0.35 ),
    vec2(  -0.15 ,  -0.35 ),
    vec2(  -0.15 ,  0.50 ),
    vec2(  -0.5 ,  0.5 )
    ]; 
    
upoints=[
    vec2( -0.65 , 0.5 ),
    vec2(  -0.25 , 0.5 ),
    vec2( -0.25 ,  0.0 ),
    vec2(  -0.25 , -0.35 ),
    vec2(  0.25 , -0.35 ),
    vec2(  0.25 ,  0.0 ),
    vec2(  0.25 ,  0.5 ),
    vec2( 0.65 , 0.5 ),
    vec2(  0.65 ,  0.0 ),
    vec2( 0.65 ,  -0.65 ),
    vec2(  0.0 ,  -0.65 ),
    vec2(  -0.65 ,  -0.65 )
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

    var bufferI = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferI );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(ipoints), gl.STATIC_DRAW );

    var ipositionLoc = gl.getAttribLocation( program, "iPosition" );
    gl.vertexAttribPointer( ipositionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( ipositionLoc );




    
    var bufferu = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferu );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(upoints), gl.STATIC_DRAW );

    

   var upositionLoc = gl.getAttribLocation( program, "uPosition" );
    gl.vertexAttribPointer( upositionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( upositionLoc );

tLoc = gl.getUniformLocation(program, "t");

colorLoc = gl.getUniformLocation(program, "inColor" );

//event handlers

document.getElementById("Morph").onclick = 
function (){
	morph = !morph;
};

// from rotating triangle lab
window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case '1':
            morph = !morph;
            break;

          case '2':
            DeltaT /= 2;
            break;

          case '3':
            DeltaT *= 2;
            break;
}
};

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

	if (morph) tParam += DeltaT;
	if (tParam>=1.0 || tParam<= 0.0)
	DeltaT = -DeltaT;
	gl.uniform1f(tLoc, tParam);

	color = mix(icolor, ucolor, tParam);
	gl.uniform4fv(colorLoc, color);

   gl.drawArrays( gl.LINE_LOOP, 0, 12 ); 

setTimeout(
	function (){
requestAnimationFrame(render);
}, delay);

}
