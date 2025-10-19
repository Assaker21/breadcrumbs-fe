import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;
    const bounds = points.map((p) => [p.latitude, p.longitude]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);

  return null;
}

export default function MapWithPoints({
  points,
  autoFit = true,
  defaultCenter = [0, 0],
  defaultZoom = 2,
}) {
  return (
    <div className="w-full h-[calc(100%-60px)] rounded-2xl overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {autoFit && <FitBounds points={points} />}

        {points.map((p, i) => (
          <Marker
            key={p.id ?? i}
            position={[p.latitude, p.longitude]}
            icon={L.icon({
              iconUrl: "/marker.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
              {p.label ??
                `Lat: ${p.latitude.toFixed(5)}, Lng: ${p.longitude.toFixed(5)}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
