"use client";
import * as React from "react";
import { useTravelContext } from "@/components/context/TravelContext";
import { generateRandomId } from "@/utils/randomId";

interface TransitStep {
  type: string;
  line?: string;
  vehicle?: string;
  departureStop?: string;
  arrivalStop?: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
}

// interface TransitRoute {
//   duration: string;
//   departureTime: string;
//   arrivalTime: string;
//   steps: TransitStep[];
// }

const RouteOptionItem: React.FC<{ travelMode: google.maps.TravelMode }> = ({
  travelMode,
}) => {
  const { responses } = useTravelContext();

  // const [routes, setRoutes] = React.useState<google.maps.DirectionsRoute[]>([]);
  const [expandedRouteIndex, setExpandedRouteIndex] = React.useState<
    number | null
  >(null); // Track which route is expanded

  const rawRoutes = React.useMemo(() => {
    return responses.find(
      (response) => response.request.travelMode === travelMode,
    )?.routes;
  }, [responses, travelMode]);

  console.log(rawRoutes, travelMode);

  const parseTransitRoutes = React.useCallback(() => {
    if (!rawRoutes) {
      return [];
    }
    return rawRoutes.map((route) => {
      const legs = route.legs[0];
      const steps = legs.steps.map((step) => {
        if (step.travel_mode === "TRANSIT") {
          return {
            type: "transit",
            line: step.transit?.line.name,
            vehicle: step.transit?.line.vehicle.type,
            departureStop: step.transit?.departure_stop.name,
            arrivalStop: step.transit?.arrival_stop.name,
            departureTime: step.transit?.departure_time.text,
            arrivalTime: step.transit?.arrival_time.text,
          };
        } else {
          return {
            type: "walking",
            duration: step.duration?.text,
          };
        }
      });

      return {
        duration: legs.duration?.text,
        arrivalTime: legs.arrival_time?.text,
        departureTime: legs.departure_time?.text,
        steps,
      };
    });
  }, [rawRoutes]);

  const toggleRouteDetails = (index: number) => {
    setExpandedRouteIndex(index === expandedRouteIndex ? null : index); // Toggle expansion
  };

  const generateBreadcrumbs = (steps: TransitStep[]) => {
    return steps.map((step, index) => {
      if (step.type === "walking") {
        return (
          <span key={generateRandomId()} className="flex">
            <span className="flex items-center space-x-1">
              <span>🚶</span>
            </span>
            {index < steps.length ? (
              <span className="flex items-center space-x-1">
                <i className="fas fa-caret-right"></i>
              </span>
            ) : null}
          </span>
        );
      } else {
        return (
          <span key={generateRandomId()} className="flex">
            <span className="flex items-center space-x-1 text-gray-800 font-medium">
              <span>🚌</span>
              <span>{step.line}</span>
            </span>
            {index < steps.length ? (
              <span className="flex items-center space-x-1">
                <i className="fas fa-caret-right"></i>
              </span>
            ) : null}
          </span>
        );
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      {travelMode === google.maps.TravelMode.TRANSIT
        ? parseTransitRoutes().map((route, index) => (
            <div
              key={generateRandomId()}
              className="mb-6 border border-gray-300 rounded-lg bg-white p-4 shadow"
            >
              {/* Basic Information */}
              <div
                className="cursor-pointer"
                onClick={() => toggleRouteDetails(index)}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    {route.departureTime} — {route.arrivalTime}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Total: {route.duration}
                  </p>
                </div>

                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center mt-2 text-gray-700 space-x-2">
                  {generateBreadcrumbs(route.steps)}
                </div>
              </div>

              {/* Expandable Detailed Information */}
              {expandedRouteIndex === index && (
                <div className="mt-4 space-y-2">
                  {route.steps.map((step) => (
                    <div
                      key={generateRandomId()}
                      className="p-2 bg-gray-50 rounded flex items-center"
                    >
                      {step.type === "walking" ? (
                        <p className="text-gray-700">
                          🚶 Walk for {step.duration}
                        </p>
                      ) : (
                        <p className="text-gray-700">
                          🚌 Take {step.vehicle} ({step.line}) from{" "}
                          <span className="font-medium">
                            {step.departureStop}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {step.arrivalStop}
                          </span>{" "}
                          ({step.departureTime} — {step.arrivalTime})
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        : rawRoutes?.map((route, index) => {
            return (
              <div
                key={generateRandomId()}
                className="mb-6 border border-gray-300 rounded-lg bg-white p-4 shadow"
              >
                {/* Basic Information */}
                <div
                  className="cursor-pointer"
                  onClick={() => toggleRouteDetails(index)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      via {route.summary}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Total:{" "}
                      {route.legs[0].duration
                        ? route.legs[0].duration.text
                        : "NaN"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default RouteOptionItem;
