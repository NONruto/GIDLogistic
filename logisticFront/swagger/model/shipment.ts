export interface Shipment {
    id?: string;
    service?: string;
    origin?: LocationInfo;
    destination?: LocationInfo;
    status?: Status;
    events?: Event[];
  }
  
  export interface LocationInfo {
    address?: Address;
  }
  
  export interface Address {
    countryCode?: string;
    addressLocality?: string;
  }
  
  export interface Status {
    timestamp?: string; // ISO-Format z. B. "2024-01-26T12:34:56Z"
    location?: LocationInfo;
    statusCode?: string;
    statusDetailed?: string;
    description?: string;
    remark?: string;
  }
  
  export interface Event {
    timestamp?: string; // ISO-Format
    statusCode?: string;
    statusDetailed?: string;
    description?: string;
    remark?: string;
    location?: LocationInfo;
  }