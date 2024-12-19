
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;

attribute vec3 position;
attribute vec3 normal;

attribute vec2 uv;

varying vec2 vUv;




void main() {
  vUv = uv;
  float step = step(0.5, fract(vUv.y * 10.));


  vec3 pos = position + ((normal * step));

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  

  gl_Position = projectionPosition;
}