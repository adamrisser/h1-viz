import * as THREE from "three";

const loader = new THREE.TextureLoader();
loader.setCrossOrigin("");

// b & w flat earth
const globeTexture = loader.load("/bw-world.jpg");

globeTexture.wrapS = THREE.RepeatWrapping;
globeTexture.wrapT = THREE.RepeatWrapping;
globeTexture.repeat.set(1, 1);

// const disk = loader.load("/circle.png");
// const spark = loader.load("/spark1.png");
const circle = loader.load("./white-dot.png");

export const pointShaderMaterial = new THREE.ShaderMaterial({
  depthWrite: true,
  uniforms: {
    visibility: {
      value: globeTexture,
    },
    shift: {
      value: 0,
    },
    shape: {
      value: circle,
    },
    size: {
      value: 7,
    },
    scale: {
      value: window.innerHeight / 2,
    },
    color: {
      value: new THREE.Color(0xffffff),
    },
  },
  vertexShader: `
    attribute float isPulse;
    attribute float isFade;
    attribute float delay;
      
    uniform float scale;
    uniform float size;
		uniform float shift;
    uniform vec3 color;
    
    varying vec2 vUv;
    
    varying float isFading;
    varying float animationDelay;
    
    void main() {
      isFading = isFade;
      animationDelay = delay;
      
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      
      if(isPulse > 0.75) {
      	float newSize = (size + abs(sin(shift + delay) / 15.0));
        gl_PointSize = newSize * ( scale / length( mvPosition.xyz )) * (0.3 + sin(uv.y * 3.1415926) * 0.6 );
      } else {
        gl_PointSize = size * ( scale / length( mvPosition.xyz )) * (0.3 + sin(uv.y * 3.1415926) * 0.6 );
      }
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
      uniform sampler2D visibility;
      uniform float shift;
      uniform sampler2D shape;
      uniform vec3 color;

      varying vec2 vUv;

      varying float isFading;
      varying float animationDelay;
      
      void main() {
        vec2 uv = vUv;
      
        vec4 v = texture2D(visibility, uv);
        if (length(v.rgb) <= 1.0) discard;

				float opacity = sin(shift + animationDelay);
				
        vec3 c = vec3(1, 1, 1);

        if(isFading > 0.75) {
        	gl_FragColor = vec4(color, opacity);
					if (opacity < 0.1) discard;
        }else {
        	gl_FragColor = vec4(c, 1.0);
        }
        
        vec4 shapeData = texture2D(shape, gl_PointCoord);
        if (shapeData.a < 0.625) discard;
        
        gl_FragColor = gl_FragColor * shapeData;
      }
  `,
  transparent: true,
});
