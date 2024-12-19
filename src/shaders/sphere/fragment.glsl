precision mediump float;
varying vec2 vUv;

uniform float uTime;


float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}



void main() {

  float c = vUv.y + (uTime * 0.05);
  float color = step(0.5, fract(c * 10.));

  gl_FragColor = vec4(vec3(0.5 + color, 0.2 + color, color), 1.0);

}