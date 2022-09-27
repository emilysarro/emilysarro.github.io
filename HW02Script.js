function kochmount(){

var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );

var vertices = [
	vec2(-.99,0),
	vec2(.99,0)
];


//for (var i=0; positions.length < numPositions; i++){
//var j = Math.floor(3*Math.random());

//p = add(positions[i], vertices[j]);
//p = mult(.5,p);
//positions.push(p);

//}


gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);


 var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.LINES, vertices[0],vertices[1]);
}

