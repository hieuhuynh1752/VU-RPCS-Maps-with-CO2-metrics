"use client";
import * as React from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState } from "react";

type DirectionsProps = {
  origin: string;
  destination: string;
  travelMode?: google.maps.TravelMode;
};

const Directions: React.FC<DirectionsProps> = ({
  origin,
  destination,
  travelMode = google.maps.TravelMode.DRIVING,
}) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    React.useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer>();
  directionsRenderer?.setMap(map);
  const [routes, setRoutes] = React.useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  React.useEffect(() => {
    if (!routesLibrary || !map || !origin || !destination) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer());
  }, [routesLibrary, map, origin, destination]);

  React.useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error("error fetching directions:", error);
      });
  }, [directionsService, directionsRenderer, origin, destination]);

  // Update direction route
  React.useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  console.log(selected);
  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Directions;
