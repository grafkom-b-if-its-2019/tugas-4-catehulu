precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform float scale;
uniform vec3 translate;
uniform float middle_coorinates;

void main() {
  fColor = vColor;
  gl_Position = vec4(vPosition, 0.0, 1.0);
  mat4 translasi = mat4(
      1, 0, 0, translate.x,
      0, 1, 0, translate.y,
      0, 0, 1, translate.z,
      0, 0, 0, 1
  );

  
  vec3 angle = radians(theta);
  vec3 c = cos(angle);
  vec3 s = sin(angle);
  
  mat4 rx = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  mat4 rz = mat4(
    c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  vec4 rotated_position =  rx * ry * rz * vec4(vPosition, 0.0, 1.0);
  vec4 middle_x = vec4(middle_coorinates, 0, 0, 1.0);
  vec4 middle_vector =   rx * ry * rz * middle_x;

  mat4 Skalasi = mat4(
      0.2       , 0             , 0, 0,
      0           , 0.2             , 0, 0,
      0           , 0             , 1, 0,
      0           , 0             , 0, 1
  );

  mat4 pseudo_rotate = mat4(
      scale       , 0             , 0, -(middle_vector.x)*scale+middle_vector.x,
      0           , 1             , 0, 0,
      0           , 0             , 1, 0,
      0           , 0             , 0, 1
  );
  gl_Position = rotated_position * translasi * pseudo_rotate * Skalasi;
}
