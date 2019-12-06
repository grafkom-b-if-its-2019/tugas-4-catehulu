(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  var shaders = [];
  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);

  var current_middle = [0.35, -0.2, 0];

  var theta = [0.0, 0.0, 0.0];
  var axis = 0;
  var xAxis = 0;
  var yAxis = 1;
  var zAxis = 2;
  
  function initShaders() {
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
    shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));
  }

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    initShaders();

    var cubeVertices = [
      // x, y, z            u, v         normal

      //-0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
      //-0.5, -0.5,  0.5,     0.0, 0.0,  0.0, 0.0, 1.0, 
      // 0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
      //-0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, 
      // 0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
      // 0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 0.0, 1.0, 

       0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
       0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5, -0.5,     1.0, 1.0,  1.0, 0.0, 0.0,

       0.5, -0.5,  0.5,     0.0, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
      -0.5, -0.5,  0.5,     0.0, 0.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     1.0, 0.0,  0.0, -1.0, 0.0,
       0.5, -0.5,  0.5,     0.0, 1.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     1.0, 0.0,  0.0, -1.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 1.0,  0.0, -1.0, 0.0,

      -0.5, -0.5, -0.5,     0.0, 1.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
      -0.5,  0.5, -0.5,     0.0, 0.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     1.0, 0.0,  0.0, 0.0, -1.0,
      -0.5, -0.5, -0.5,     0.0, 1.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     1.0, 0.0,  0.0, 0.0, -1.0,
       0.5, -0.5, -0.5,     1.0, 1.0,  0.0, 0.0, -1.0,

      -0.5,  0.5, -0.5,     0.0, 1.0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
      -0.5, -0.5, -0.5,     0.0, 0.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     1.0, 0.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5, -0.5,     0.0, 1.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     1.0, 0.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 1.0,  -1.0, 0.0, 0.0,

       0.5,  0.5, -0.5,     0.0, 1.0,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
      -0.5,  0.5, -0.5,     0.0, 0.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     0.0, 1.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 1.0, 0.0
    ];

    var triangleVertices = new Float32Array([
      +0.2, -0.5,   1,1,1, //1  
      +0.2, +0.5,   1,1,1, //2
      +0.3, -0.5,   1,1,1, //3
      +0.3, +0.5,   1,1,1, //3
      +0.3, -0.0,   1,1,1, //11
      +0.35, +0.2,  1,1,1, //4 titik tengah
      +0.35, -0.2,  1,1,1, //10 titik tengah
      +0.35, +0.2,  1,1,1, //4 titik tengah
      +0.4, -0.0,   1,1,1,//9
      +0.4, +0.5,   1,1,1,//5
      +0.5, +0.5,   1,1,1,//6
      +0.5, -0.5,   1,1,1,//7
      +0.4, -0.5,   1,1,1,//8
      +0.4, +0.5,   1,1,1,//5 
    ]);
    
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      // drawA(gl.TRIANGLE_STRIP, triangleVertices, 1, shaders[1]);
      drawA(gl.TRIANGLES, cubeVertices, 0, shaders[0]);
    
      requestAnimationFrame(render);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    render();

    function drawA(type, vertices, mode, program) {

      var n = initBuffers(mode, vertices, program);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function initBuffers(mode, vertices, program) {
      var n;
      if (mode) {
        n = vertices.length/5;
      } else {
        n = vertices.length/6;
      }
      // console.log(vertices);

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      // Definisi view dan projection
      var vmLoc = gl.getUniformLocation(program, 'view');
      var pmLoc = gl.getUniformLocation(program, 'projection');
      var mmLoc = gl.getUniformLocation(program, 'model');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();
      // console.log(pm);

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, -0.5),    // posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vNormal = gl.getAttribLocation(program, 'vNormal');
      
      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
      var lightColor = [0.5, 0.5, 0.5];
      var lightPosition = current_middle;
      var ambientColor = glMatrix.vec3.fromValues(0.2, 0.2, 0.2);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);

      if (mode) {
        
        var vColor = gl.getAttribLocation(program, 'vColor');

        if (scale > 1){
          adder = -0.0088
        }
        else if (scale < -1){
          adder = 0.0088
        }

        scale += adder;
        // console.log(scale);
        
        gl.vertexAttribPointer(
            vPosition, // Variable yang memegang posisi atribut di shader
            2, // Jumlah element per attribut
            gl.FLOAT, // tipe data attribut
            gl.FALSE, 
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0 //offset dari posisi elemen di array
        );
    
        gl.vertexAttribPointer(
            vColor,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );

        //Translasi X
        if (translate[0] + 0.5 + xAdders > 0.5*5 || translate[0] + 0.2 + xAdders < -0.5*5 ) {
          xAdders *= -1;
        }
        translate[0] += xAdders;

        current_middle += translate[0];

        //Translasi Y
        if (translate[1] + 0.5 + yAdders> 0.5*5 || translate[1] + -0.5 + yAdders < -0.5*5 ) {
          yAdders *= -1;
        }
        translate[1] += yAdders;

        //Translasi Z
        if (translate[2] + zAdders > 0.5*0.5 || translate[2] + zAdders < -0.5*0.5 ) {
          zAdders *= -1;
        }
        translate[2] += zAdders;

        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
        glMatrix.mat4.translate(mm, mm, translate);
        glMatrix.mat4.scale(mm,[0.5, 0.5, 0.5]);
        glMatrix.mat4.scale(mm,[scale, 1.0, 1.0]);
        // glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
        // glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
        // glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        
        gl.enableVertexAttribArray(vColor);
      } else{
  
        var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
        gl.vertexAttribPointer(
          vPosition,  // variabel yang memegang posisi attribute di shader
          3,          // jumlah elemen per attribute
          gl.FLOAT,   // tipe data atribut
          gl.FALSE,
          8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
          8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
          8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vTexCoord);

        theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
        // glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
        // glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
        // glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        
        // Uniform untuk tekstur
        var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
        gl.uniform1i(sampler0Loc, 0);
        // Inisialisasi tekstur
        var texture = gl.createTexture();
        if (!texture) {
          reject(new Error('Gagal membuat objek tekstur'));
        }
        gl.activeTexture(gl.TEXTURE0);
        initTexture(texture);
      }
      var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vNormal);
      return n;
    }

    

    // Membuat mekanisme pembacaan gambar jadi tekstur
    function initTexture(texture) {
      var imageSource = 'images/txStainglass.bmp';
      var image = new Image();
      if (!image) {
        reject(new Error('Gagal membuat objek gambar'));
      }
      image.onload = function() {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      }
      image.src = imageSource;
    }
  }

})();
