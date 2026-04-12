import { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useMotionValueEvent } from "framer-motion";

const SAHARANPUR = [29.9640, 77.5460];
const CHENNAI = [13.0827, 80.2707];

// Calculate straight geographical interpolation between two coordinate arrays
function calculateProgressPosition(start, end, progress) {
  const lat = start[0] + (end[0] - start[0]) * progress;
  const lng = start[1] + (end[1] - start[1]) * progress;
  return [lat, lng];
}

export default function HeroRouteMap({ scrollProgress }) {
  const [vehiclePos, setVehiclePos] = useState(SAHARANPUR);
  const [routeColor, setRouteColor] = useState("#e11d48"); 

  // Synchronously bind the Framer Motion wheel event to the Leaflet coordinate state
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    // Accelerate the progress massively so the journey completes 
    // visibly BEFORE the destination scrolls off the screen!
    const acceleratedProgress = latest * 3.5;
    const p = Math.min(Math.max(acceleratedProgress, 0), 1);
    
    // Update Map coordinate physically via lerping
    setVehiclePos(calculateProgressPosition(SAHARANPUR, CHENNAI, p));
    
    // Transition color to green at exactly 85% trip completion
    if (p > 0.85) {
      setRouteColor("#10B981");
    } else {
      setRouteColor("#e11d48");
    }
  });

  const center = [
     (SAHARANPUR[0] + CHENNAI[0]) / 2,
     (SAHARANPUR[1] + CHENNAI[1]) / 2,
  ];

  // Creates the highly stylized glowing Bus icon
  const animatedVehicleIcon = L.divIcon({
    className: "custom-leaflet-vehicle",
    html: `
      <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%);">
        <div style="position: absolute; inset: -14px; background: radial-gradient(circle, rgba(16, 185, 129, 0.5), transparent); border-radius: 99px; animation: pulseAura 1.5s infinite;"></div>
        <div style="font-size: 32px; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5)); transform: scaleX(-1);">🚌</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [0, 0]
  });

  const cityPin = (name) => L.divIcon({
    className: "custom-city-pin",
    html: `
      <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-family: Inter, sans-serif; font-size: 18px; color: #111827; text-shadow: 0 2px 4px rgba(255,255,255,0.8); transform: translate(-50%, -50%); white-space: nowrap;">
        ${name}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
      <MapContainer 
        center={center} 
        zoom={5} 
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        style={{ width: "100%", height: "100%", background: "#cad2d3" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        <Polyline
          key={routeColor}
          pathOptions={{ color: routeColor, weight: 6, dashArray: "12, 12", lineJoin: "round", lineCap: "round" }}
          positions={[SAHARANPUR, CHENNAI]}
        />
        
        <Marker position={SAHARANPUR} icon={cityPin("📍 Saharanpur")} />
        <Marker position={CHENNAI} icon={cityPin("🏁 Chennai")} />
        
        <Marker position={vehiclePos} icon={animatedVehicleIcon} zIndexOffset={1000} />
      </MapContainer>
    </div>
  );
}
