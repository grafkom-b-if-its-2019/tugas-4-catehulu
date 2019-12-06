precision mediump float;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 ambientColor;

void main() {
  
  vec3 normal = normalize(fNormal);
  vec3 lightDirection = lightPosition - fPosition;
  float lightIntensity = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse = lightColor * fColor * lightIntensity;
  vec3 ambient = ambientColor * fColor;

  gl_FragColor = vec4(diffuse + ambient, 1.0);
}
