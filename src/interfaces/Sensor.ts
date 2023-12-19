interface Sensor {
    _id: string;
    name: string;
    description?: string;
    secretKey: string;
    isPublic: boolean;
    types: string[];
    alerts: string[];
    lastSettingsUpdateTimestamp?: Date;
    settings: {
      name: string;
      value: string;
      valueType: 'Integer' | 'Bool' | 'Double' | 'String';
    }[];
    lastLogs: {
      timestamp: Date;
      message: string;
    }[];
    errors: {
      timestamp: Date;
      message: string;
    }[];
    defaultLocation?: {
      latitude: number;
      longitude: number;
    }[];
    batteryStatus: {
      timestamp: Date;
      status: number;
    }[];
    currentOptions: {
      apiUri: string;
      apiVersion: string;
      sensorId: string;
      secretKey: string;
      dataSendingFrequency: number;
      isSendSensorData: boolean;
      serverAlwaysLive: boolean;
    };
    newOptions: {
      apiUri: string;
      apiVersion: string;
      sensorId: string;
      secretKey: string;
      dataSendingFrequency: number;
      isSendSensorData: boolean;
      serverAlwaysLive: boolean;
    };
  }
  
  export default Sensor;  