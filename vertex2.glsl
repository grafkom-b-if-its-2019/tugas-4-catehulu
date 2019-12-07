precision mediump float;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec3 vColor;

varying vec3 fColor;
varying vec3 fPosition;
varying vec3 fNormal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat4 MVPMatrix;

uniform mat3 normalMatrix;

void main() {
  fColor = vColor;

  gl_Position = MVPMatrix * vec4(vPosition, 1.0);
  
  fPosition = vec3(view * model * vec4(vPosition, 1.0));
  fNormal = normalMatrix * vNormal;
}
