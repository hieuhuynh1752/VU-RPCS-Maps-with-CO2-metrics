"use client";

import { Sidebar } from "@/components/Sidebar";
import MapContainer from "@/components/MapContainer";
import { TravelProvider } from "@/components/context/TravelContext";
import { APIProvider } from "@vis.gl/react-google-maps";
import * as React from "react";
import { GoogleMapsContext } from "@/components/custom-hooks/GoogleMapsContext";

function Home() {
  const [googleMaps, setGoogleMaps] = React.useState<
    typeof google.maps | undefined
  >(undefined);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (typeof google !== "undefined" && google.maps) {
        setGoogleMaps(google.maps);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMapsContext.Provider value={googleMaps}>
            {googleMaps ? (
              <TravelProvider>
                <Sidebar />
                <div className="relative flex-1">
                  <MapContainer />
                </div>
              </TravelProvider>
            ) : null}
          </GoogleMapsContext.Provider>
        </APIProvider>
      </div>
    </div>
  );
}

export default React.memo(Home);
