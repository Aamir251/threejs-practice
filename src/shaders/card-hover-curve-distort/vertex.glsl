uniform sampler2D uTexture;

uniform vec2 uOffset;

varying vec2 vUv;


float M_PI = 3.141529;



vec3 curvedPosition(vec3 position, vec2 uv, vec2 offset) {
  float positionY = (position.y + (sin(uv.x * M_PI) * uOffset.x));
  float positionX = (position.x + (sin(uv.y * M_PI) * uOffset.y));

  return vec3(positionX, positionY, position.z);
}



void main() {
  vUv = uv;

  vec3 newPosition = curvedPosition(position, uv, uOffset);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

}