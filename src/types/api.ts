export interface Step {
  type: string;
  distance: number;
  vehicleType?: string;
  duration?: string;
  line?: string;
  vehicle?: string;
  departureStop?: string;
  arrivalStop?: string;
  departureTime?: string;
  arrivalTime?: string;
  numberOfStops?: number;
  color?: string;
  textColor?: string;
  shortName?: string;
  summary?: string;
  co2?: number; // Calculated COc emission
}

export interface TransitRoute {
  steps: Step[];
  duration?: string;
  arrivalTime?: string;
  departureTime?: string;
  totalCo2?: number;
}

export function isTransitRoutes(
  routes: Step[] | TransitRoute[],
): routes is TransitRoute[] {
  return (routes as TransitRoute[])[0].steps !== undefined;
}

export interface EnrichedStepsResponse {
  steps: Step[];
}
