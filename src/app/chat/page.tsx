"use client";
import React, { useEffect, useRef } from "react";
import ChatBox from "./components/chatbox/Chatbox";
import style from "./page.module.css";
import Brief from "./components/brief/Brief";
import * as THREE from "three";

export default function Page() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("black"), 1); // Color de fondo

    mountRef.current?.appendChild(renderer.domElement);
    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.3);
      }
    `;

    // Fragment shader
    const fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;

      void main() {
        // Mix the two colors based on the distance to the center
        float r = distance(vUv, vec2(0.5, 0.6));
        vec3 color = mix(color1, color2, r);
        gl_FragColor = vec4(color, 0.5 - smoothstep(0.1, 0.5, r)); // Smoothstep will create the fading effect
      }
    `;
    const uniforms = {
      color1: { value: new THREE.Color("#B26000") }, // Inner color
      color2: { value: new THREE.Color("#B26000") }, // Outer color
    };
    const uniforms2 = {
      color1: { value: new THREE.Color("#1712E1") }, // Inner color
      color2: { value: new THREE.Color("#1712E1") }, // Outer color
    };
    // Create the shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const shaderMaterial2 = new THREE.ShaderMaterial({
      uniforms: uniforms2,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Geometría de los círculos
    const geometry = new THREE.CircleGeometry(10, 5);

    // Materiales con diferentes colores y difuminado
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xff6347,
      transparent: true,
      opacity: 0,
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: 0x4682b4,
      transparent: true,
      opacity: 0,
    });

    // Crear dos círculos
    const circle1 = new THREE.Mesh(geometry, shaderMaterial2);
    const circle2 = new THREE.Mesh(geometry, shaderMaterial);

    // Posicionamiento de los círculos
    circle1.position.set(3, 0, -10);
    circle2.position.set(3, 1, -9);

    // Añadir círculos a la escena
    scene.add(circle1);
    scene.add(circle2);

    // Cámara
    camera.position.z = 2;
    let angle = 0;
    const radius = 4; // Radio del movimiento circular
    const radius2 = 8; // Radio del movimiento circular

    // Función de animación
    const animate = function () {
      requestAnimationFrame(animate);

      // Actualizar la posición de los círculos
      circle1.position.x = radius * Math.cos(angle);
      circle1.position.y = radius * Math.sin(angle);

      circle2.position.x = radius * Math.cos(angle + Math.PI); // Desfase de 180 grados
      circle2.position.y = radius2 * Math.sin(angle + Math.PI);

      angle += 0.002; // Velocidad del movimiento circular

      renderer.render(scene, camera);
    };

    // Iniciar animación
    animate();

    // Limpieza al desmontar el componente
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(circle1);
      scene.remove(circle2);
      geometry.dispose();
      material1.dispose();
      material2.dispose();
    };
  }, []);
  return (
    <div className={style.main}>
      <div className={style.backgroundCanvas} ref={mountRef}></div>
      <ChatBox />
      <Brief />
    </div>
  );
}
