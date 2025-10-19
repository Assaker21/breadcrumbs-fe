import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
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
  const times = points.map((p) => new Date(p.createdAt).getTime());
  const maxTime = Math.max(...times); // newest
  const minTime = Math.min(...times);
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
          <CircleMarker
            key={p.id ?? i}
            center={[p.latitude, p.longitude]}
            radius={10}
            pathOptions={{
              color: "black",
              fillColor: getColor(p.createdAt, minTime, maxTime),
              fillOpacity: 1,
            }}
          >
            <Popup>
              {p.label ??
                `Lat: ${p.latitude.toFixed(5)}, Lng: ${p.longitude.toFixed(5)}`}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

const getColor = (createdAt, minTime, maxTime) => {
  const t = new Date(createdAt).getTime();

  // Normalize (0 = oldest, 1 = newest)
  let ratio = 0;
  if (maxTime !== minTime) {
    ratio = (t - minTime) / (maxTime - minTime);
  }
  // ratio 0 => red (255,0,0)
  // ratio 1 => green (0,255,0)
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * ratio);
  return `rgb(${r},${g},0)`;
};
