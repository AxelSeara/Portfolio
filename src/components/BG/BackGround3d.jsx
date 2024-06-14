// src/components/BackGround3d.jsx
import React, { useEffect } from 'react';
import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';

const BackGround3d = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.className = 'fixed inset-0 z-0';
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const noise = new SimplexNoise();
    const animate = () => {
      const time = Date.now() * 0.0001;
      const position = geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = noise.noise2D(x * 0.01 + time, y * 0.01 + time) * 20;
        position.setZ(i, z);
      }
      position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    camera.position.z = 500;

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
};

export default BackGround3d;