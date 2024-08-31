import React, { useRef, useEffect } from 'react';
import Globe from '../utils/globe'
import { Mesh, CircleGeometry, MeshBasicMaterial, DoubleSide, Vector3 } from 'three';

interface Props {
    width: number;
    color: string;
    mode: string;
    lat: number;
    lng: number;
    updateCoor: Function;
}

const Map = (props: Props) => {
    const globeContainerRef = useRef<HTMLDivElement | null>(null);
    const globeInstanceRef = useRef<ReturnType<typeof Globe> | null>(null);
    const previousCircleRef = useRef<Mesh | null>(null);

    useEffect(() => {
        if (globeContainerRef.current && !globeInstanceRef.current) {
            const globe = Globe()(globeContainerRef.current);

            globe.controls().autoRotate = true;
            globe.controls().autoRotateSpeed = 0.5;
            globe.controls().minDistance = 250;
            globe.controls().maxDistance = 250;

            globe.onGlobeClick(handleGlobeClick);
            globeInstanceRef.current = globe;
        }

        if (globeInstanceRef.current) {
            globeInstanceRef.current
                .globeImageUrl(`//unpkg.com/three-globe/example/img/earth-${props.mode === 'dark' ? 'night' : 'day'}.jpg`)
                .width(props.width * 0.7)
                .height(props.width * 0.40)
                .backgroundColor(props.color);

            if (props.lat !== 0 && props.lng !== 0) {
                const { lat, lng } = props;

                const globe = globeInstanceRef.current;
                const camera = globe.camera();
                const controls = globe.controls();

                const target = globe.getCoords(lat, lng);
                const distance = camera.position.length();
                const newCameraPosition = new Vector3()
                    .copy(target)
                    .normalize()
                    .multiplyScalar(distance);

                const tweenDuration = 1000; // 1 second
                const startPosition = camera.position.clone();
                const startTime = performance.now();

                const animate = () => {
                    const elapsed = performance.now() - startTime;
                    const t = Math.min(elapsed / tweenDuration, 1);

                    camera.position.lerpVectors(startPosition, newCameraPosition, t);
                    controls.update();

                    if (t < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        controls.autoRotate = true;
                    }
                };

                controls.autoRotate = false; 
                animate();

                handleGlobeClick({ lat, lng });
            }
        }
    }, [props.width, props.mode, props.lat, props.lng]);

    const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }) => {
        if (globeInstanceRef.current) {
            const globe = globeInstanceRef.current;

            if (previousCircleRef.current) {
                globe.scene().remove(previousCircleRef.current);
                previousCircleRef.current.geometry.dispose();
                if (Array.isArray(previousCircleRef.current.material)) {
                    previousCircleRef.current.material.forEach(mat => mat.dispose());
                } else {
                    previousCircleRef.current.material.dispose();
                }
                previousCircleRef.current = null;
            }

            const radius = 10;
            const circleGeometry = new CircleGeometry(radius, 64);
            const material = new MeshBasicMaterial({
                color: 'yellow',
                opacity: 0.42,
                transparent: true,
                side: DoubleSide,
            });

            const circle = new Mesh(circleGeometry, material);
            const { x, y, z } = globe.getCoords(lat, lng);
            circle.position.set(x, y, z);
            circle.lookAt(0, 0, 0);

            globe.scene().add(circle);
            previousCircleRef.current = circle;
        }
    };

    return <div ref={globeContainerRef} />;
};

export default Map;
