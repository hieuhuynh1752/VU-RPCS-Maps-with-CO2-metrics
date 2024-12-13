"use client";

import React from "react";
import { useTravelContext } from "@/components/context/TravelContext";
import RouteOptionList from "@/components/RouteOptionsList";

export const Sidebar: React.FC = () => {
  const { setSearchDirection, responses } = useTravelContext();
  const [origin, setOrigin] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");

  console.log(responses);
  return (
    <div className="w-[35vw] bg-white h-screen shadow-lg flex flex-col">
      <div className="flex flex-row p-4 pb-0 gap-4">
        <div className="flex flex-col space-y-2 grow">
          {/* Starting Point Input */}
          <div className="flex items-center border rounded-lg shadow-sm p-2 gap-1">
            <div className="text-gray-500 w-8 text-center">
              <i className="fa-regular fa-circle"></i>
            </div>
            <input
              type="text"
              placeholder="Choose starting point, or click on the map"
              className="flex-1 outline-none border-none placeholder-gray-500"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          {/* Destination Input */}
          <div className="flex items-center border rounded-lg shadow-sm p-2 gap-1">
            <div className="text-red-500 w-8 text-center">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <input
              type="text"
              placeholder="Choose destination..."
              className="flex-1 outline-none border-none placeholder-gray-500"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className=" bg-blue-500 text-white hover:bg-blue-700 w-8 h-8 self-center rounded"
            onClick={() => {
              if (!origin || !destination) {
                alert("Please enter both origin and destination.");
                return;
              } else {
                setSearchDirection({ origin, destination });
              }
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <RouteOptionList />

      {/* Footer Section */}
      <div className="p-4 border-t text-sm text-gray-500">
        <p>Delays: Moderate traffic in this area</p>
      </div>
    </div>
  );
};
