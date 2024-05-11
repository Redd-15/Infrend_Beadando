import { vehicleStatus, vehicleType } from "../server/src/entity/Vehicle";

export interface UserDTO{

    id: number
    customerId : string;
    name: string;
    address:string;
    phone: string;
    idCard: string;
    driversLicense: string;
}

export interface VehicleDTO{

    id: number
    vin: string;
    brand: string;
    type: string;
    licensePlate: string;
    pricePerDay: number;
    odometer: number;
    vehicleType: vehicleType;
    status: vehicleStatus;
}

export interface RentDTO{
    id: number;
    price: number;
    timestampFrom: string;
    timestampTo: string;
}