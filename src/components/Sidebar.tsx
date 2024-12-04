"use client";

import React from "react";
import { useTravelContext } from "@/components/context/TravelContext";
import { useGoogleMaps } from "@/components/custom-hooks/GoogleMapsContext";

export const Sidebar: React.FC = () => {
  const { setSearchDirection, responses } = useTravelContext();
  const { TravelMode } = useGoogleMaps();
  const [origin, setOrigin] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [travelMode, setTravelMode] = React.useState<string>(
    TravelMode.DRIVING,
  );
  console.log(responses);
  return (
    <div className="w-[30vw] bg-white h-screen shadow-lg flex flex-col">
      {/* Travel Modes */}
      <div className="flex items-center justify-evenly p-4 border-b">
        <button
          className={`p-2 hover:bg-gray-100 w-10 rounded ${travelMode === TravelMode.DRIVING ? "bg-green-500 text-white hover:bg-green-700" : "bg-white"}`}
          onClick={() => setTravelMode(TravelMode.DRIVING)}
        >
          <i className="fas fa-car"></i>
        </button>
        <button
          className={`p-2 hover:bg-gray-100 w-10 rounded ${travelMode === TravelMode.TRANSIT ? "bg-green-500 text-white hover:bg-green-700" : "bg-white"}`}
          onClick={() => setTravelMode(TravelMode.TRANSIT)}
        >
          <i className="fas fa-bus"></i>
        </button>
        <button
          className={`p-2 hover:bg-gray-100 w-10 rounded ${travelMode === TravelMode.BICYCLING ? "bg-green-500 text-white hover:bg-green-700" : "bg-white"}`}
          onClick={() => setTravelMode(TravelMode.BICYCLING)}
        >
          <i className="fas fa-bicycle"></i>
        </button>
        <button
          className={`p-2 hover:bg-gray-100 w-10 rounded ${travelMode === TravelMode.WALKING ? "bg-green-500 text-white hover:bg-green-700" : "bg-white"}`}
          onClick={() => setTravelMode(TravelMode.WALKING)}
        >
          <i className="fas fa-walking"></i>
        </button>
        <button
          className={`p-2 hover:bg-gray-100 w-10 rounded ${travelMode === "flying" ? "bg-green-500 text-white hover:bg-green-700" : "bg-white"}`}
          onClick={() => setTravelMode("flying")}
        >
          <i className="fas fa-plane"></i>
        </button>
      </div>

      <div className="flex flex-row p-4 gap-4">
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

      {/*/!* Recent Searches *!/*/}
      {/*<div className="flex-1 overflow-y-auto">*/}
      {/*  <ul className="p-4 space-y-4">*/}
      {/*    /!* Example Items *!/*/}
      {/*    <li className="flex items-center">*/}
      {/*      <i className="fas fa-clock text-gray-400 mr-4"></i>*/}
      {/*      <span>Molly's Arena, Amsterdam</span>*/}
      {/*    </li>*/}
      {/*    <li className="flex items-center">*/}
      {/*      <i className="fas fa-clock text-gray-400 mr-4"></i>*/}
      {/*      <span>All In Print Shop, Amstelveen</span>*/}
      {/*    </li>*/}
      {/*    <li className="flex items-center">*/}
      {/*      <i className="fas fa-clock text-gray-400 mr-4"></i>*/}
      {/*      <span>Rijksmuseum</span>*/}
      {/*    </li>*/}
      {/*    <li className="flex items-center">*/}
      {/*      <i className="fas fa-clock text-gray-400 mr-4"></i>*/}
      {/*      <span>OASIS korean NoReaBang, Amsterdam</span>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
      {responses.map((response, index) => {
        return <div key={index}>{response.request.travelMode}</div>;
      })}

      {/* Footer Section */}
      <div className="p-4 border-t text-sm text-gray-500">
        <p>Delays: Moderate traffic in this area</p>
      </div>
    </div>
  );
};
