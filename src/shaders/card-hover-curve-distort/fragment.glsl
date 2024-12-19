uniform sampler2D uTexture;

uniform float uAlpha;

uniform vec2 uOffset;
varying vec2 vUv;



void main() {

  gl_FragColor = vec4(vec3(0.0, 0.0, 1.0), 1.0);
}