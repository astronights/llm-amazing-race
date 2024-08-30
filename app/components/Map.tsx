import React, { useRef, useEffect, useState } from 'react';
import Globe from 'globe.gl';
import { Mesh, CircleGeometry, MeshBasicMaterial, DoubleSide, Vector3} from 'three';

interface PointData {
    lat: number;
    lng: number;
    radius: number;
}

interface Props {
    width: number;
    color: string;
    mode: string;
    lat?: number;
    lng?: number;
}

const Map = (props: Props) => {

    const globeContainerRef = useRef<HTMLDivElement | null>(null);
    const globeInstanceRef = useRef<ReturnType<typeof Globe> | null>(null);
    const [highlightedArea, setHighlightedArea] = useState<PointData | null>(null);
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
                // .width(props.width * 0.7)
                // .height(props.width * 0.65)
                .backgroundColor(props.color);

            if (previousCircleRef.current) {
                globeInstanceRef.current.scene().remove(previousCircleRef.current);
                previousCircleRef.current.geometry.dispose();

                Array.isArray(previousCircleRef.current.material) ?
                    previousCircleRef.current.material.forEach((mat) => mat.dispose()) :
                    previousCircleRef.current.material.dispose();
            }

            if (highlightedArea) {
                const { lat, lng, radius } = highlightedArea;
                const circleGeometry = new CircleGeometry(radius, 64);
                const material = new MeshBasicMaterial({
                    color: 'yellow',
                    opacity: 0.42,
                    transparent: true,
                    side: DoubleSide,
                });

                const circle = new Mesh(circleGeometry, material);
                const { x, y, z } = globeInstanceRef.current.getCoords(lat, lng);
                circle.position.set(x, y, z);
                circle.lookAt(0, 0, 0); 

                globeInstanceRef.current.scene().add(circle);
                previousCircleRef.current = circle;
            }

            if (props.lat !== undefined && props.lng !== undefined) {
                const lat = props.lat
                const lng = props.lng;

                const { x, y, z } = globeInstanceRef.current.getCoords(lat, lng);

                globeInstanceRef.current.camera().position.set(x, y, z);
                globeInstanceRef.current.camera().lookAt(new Vector3(0, 0, 0));

                globeInstanceRef.current.controls().target.set(x, y, z);
                globeInstanceRef.current.controls().update();

                handleGlobeClick({ lat, lng });
            }
        }
    }, [highlightedArea, props.width, props.mode, props.lat, props.lng]);

    const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }) => {
        const radius = 10;
        setHighlightedArea({ lat, lng, radius });
    };

    return <div ref={globeContainerRef} />;
};

export default Map;
