export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  coordinates: Coordinate;
}

export interface FlightInfo {
  departure: Airport | null;
  arrival: Airport | null;
  distance: number;
  duration: number;
  price: number;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passengers: number;
  date: string;
  specialRequests: string;
}
