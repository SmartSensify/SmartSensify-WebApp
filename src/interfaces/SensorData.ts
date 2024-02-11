export interface Location {
  x: string;
  y: string;
}

export interface Reading {
  type: string;
  unit: string;
  value: string;
  _id: string;
}

export interface SensorData {
  location: Location;
  _id: string;
  sensorId: string;
  timestamp: string;
  readings: Reading[];
  __v: number;
}