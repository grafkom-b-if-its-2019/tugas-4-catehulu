precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColour;
varying vec3 fColour;
uniform float theta;
// uniform float scale;

void main() {
  fColour = vColour;
  // gl_Position = vec4(vPosition, 0.0, 1.0);
  // mat4 translasi = mat4(
  //     1, 0, 0, 0.5,
  //     0, 1, 0, 0,
  //     0, 0, 1, 0,
  //     0, 0, 0, 1
  // );

  
  // gl_Position = vec4(vPosition, 0.0, 1.0) * translasi;
  
  mat4 rotasi = mat4(
      cos(theta) , -sin(theta)  , 0, 0.65*cos(theta)-0.65,
      sin(theta) , cos(theta)   , 0, 0.65*sin(theta),
      0           , 0             , 1, 0,
      0           , 0             , 0, 1
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * rotasi;

  // mat4 Skalasi = mat4(
  //     1       , 0             , 0, 0,
  //     0           , 1             , 0, 0,
  //     0           , 0             , 1, 0,
  //     0           , 0             , 0, 1
  // );
  // gl_Position = vec4(vPosition, 0.0, 1.0) * Skalasi;
}
