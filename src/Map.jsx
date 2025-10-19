import MapWithPoints from "./MapWithPoints";
import { useEffect, useState } from "react";

function formatLocalDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Map({ passcode }) {
  const [points, setPoints] = useState([]);

  async function getData() {
    const response = await fetch(import.meta.env.VITE_BACKEND + "/crumbs", {
      headers: {
        "api-key": passcode,
      },
    });

    const data = await response.json();

    setPoints(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const filteredPoints = points
    .filter((v) => v.hdop < 90)
    .map((point) => {
      return {
        latitude: point.latitude,
        longitude: point.longitude,
        createdAt: point.createdAt,
        label: (
          <>
            hdop: {point.hdop}
            <br />
            {`${formatLocalDate(new Date(point.createdAt))}`}
            <br />
          </>
        ),
      };
    });

  return (
    <div className="w-[calc(100%-40px)] mx-auto h-[calc(100vh-40px)] mt-[20px]">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tighter w-full mb-4">
          Breadcrumbs
        </h1>
        {filteredPoints.length ? (
          <span className="flex-grow leading-5">
            Last signal at:{" "}
            {formatLocalDate(
              filteredPoints?.[filteredPoints.length - 1]?.createdAt
            )}
          </span>
        ) : null}
      </div>
      <MapWithPoints points={filteredPoints} />
    </div>
  );
}
