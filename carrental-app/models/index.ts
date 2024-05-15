import { rentState } from "../server/src/entity/Rent";
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
    calculatedPrice: number;
    state: rentState;
    timestampFrom: string | null;
    timestampTo: string | null;
    renting: UserDTO | null;
    vehicle: VehicleDTO | null;
}

export interface LoginDTO{
    email: string | null;
    password: string | null;
    password2: string | null;
}

export interface endCalculationDTO {
    newOdometer: number,
    distanceMoney: number,
    crashMoney: number
}

export interface AccessTokenDTO{
    accessToken: string
}