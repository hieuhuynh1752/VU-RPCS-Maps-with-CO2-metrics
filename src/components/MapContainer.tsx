"use client";

import * as React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Directions from "@/components/maps-components/Direction";

type DirectionType = {
  origin: string;
  destination: string;
};

const MapContainer: React.FC = () => {
  const [origin, setOrigin] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [searchDirection, setSearchDirection] = React.useState<
    DirectionType | undefined
  >(undefined);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="flex flex-col items-center">
        {/* Input fields for origin and destination */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={() => {
              if (!origin || !destination) {
                alert("Please enter both origin and destination.");
                return;
              } else {
                setSearchDirection({ origin, destination });
              }
            }}
            className="bg-blue-500 text-white p-2"
          >
            Get Directions
          </button>
        </div>
        <div style={{ width: "100%", height: "500px" }}>
          <Map
            defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
          >
            {searchDirection && (
              <Directions
                origin={searchDirection.origin}
                destination={searchDirection.destination}
              />
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default React.memo(MapContainer);
