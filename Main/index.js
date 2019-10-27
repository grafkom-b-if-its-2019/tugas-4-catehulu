(function(global) {

  var canvas, gl, program, shaders = [];
  
  var scale = 0;
  var adder = 0.0088;
  var theta = Math.PI * 0.0088;  // 90 degree
  

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Register Callbacks
    window.addEventListener('resize', resizer);

    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas); 

    initShaders();

    resizer();
  }

  function initShaders() {
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
    shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));
  }

  // draw!
  function draw() {
    // renderer info
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var linesVertices = new Float32Array([
      -0.8, -0.5,   1,1,1,//1  
      -0.8, +0.5,   1,1,1, //2
      -0.7, +0.5,   1,1,1, //3
      -0.65, +0.2,   1,1,1, //4 titik tengah
      -0.6, +0.5,   1,1,1, //5
      -0.5, +0.5,   1,1,1, //6
      -0.5, -0.5,   1,1,1, //7
      -0.6, -0.5,   1,1,1, //8
      -0.6, -0.0,   1,1,1, //9
      -0.65, -0.2,   1,1,1, //10 titik tengah
      -0.7, -0.0,   1,1,1, //11
      -0.7, -0.5,   1,1,1, //12  
    ]);
    var triangleVertices = new Float32Array([
      +0.2, -0.5,   1,1,1, //1  
      +0.2, +0.5,   1,1,1, //2
      +0.3, -0.5,   1,1,1, //3
      +0.3, +0.5,   1,1,1, //3
      +0.3, -0.0,   1,1,1, //11
      +0.35, +0.2,   1,1,1, //4 titik tengah
      +0.35, -0.2,   1,1,1, //10 titik tengah
      +0.35, +0.2,   1,1,1, //4 titik tengah
      +0.4, -0.0,    1,1,1,//9
      +0.4, +0.5,    1,1,1,//5
      +0.5, +0.5,    1,1,1,//6
      +0.5, -0.5,    1,1,1,//7
      +0.4, -0.5,    1,1,1,//8
      +0.4, +0.5,    1,1,1,//5 
    ]);

    function render(){


      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawA(gl.LINE_LOOP, linesVertices, 0, shaders[0]);
      drawA(gl.TRIANGLE_STRIP, triangleVertices, 1, shaders[1]);
      requestAnimationFrame(render)
    }
    render()
  }

  // Generic format
  function drawA(type, vertices, mode, program) {
    var n = initBuffers(mode, vertices, program);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(type, 0, n);
  }

  function initBuffers(mode, vertices, program) {
    var n = vertices.length/5;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColour = gl.getAttribLocation(program, 'vColour');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      vPosition, // Variable yang memegang posisi atribut di shader
      2, // Jumlah element per attribut
      gl.FLOAT, // tipe data attribut
      gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
      0 //offset dari posisi elemen di array
    );

    gl.vertexAttribPointer(
      vColour,
      3,
      gl.FLOAT,
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );
  
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColour);
    gl.useProgram(program);
    
    if (mode) {
      var scaleLocation = gl.getUniformLocation(program, 'scale');
      gl.uniform1f(scaleLocation, scale);
      if (scale > 1){
        adder = -0.0088
      }
      else if (scale < -1){
        adder = 0.0088
      }
      scale += adder;
      // console.log(scale);
    } else{
      var thetaLocation = gl.getUniformLocation(program, 'theta');
      gl.uniform1f(thetaLocation, theta);
      theta += Math.PI * 0.0088

    }
    return n;
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }

})(window || this);
