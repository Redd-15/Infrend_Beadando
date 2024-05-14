import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { RentDTO, VehicleDTO } from "../../../models";
import { Rent } from "./Rent";

export enum vehicleStatus {
    FREE = "szabad",
    RENTED = "bérelt",
    OUTOFORDER = "javítás alatt",
    EITHER = "-"
}

export enum vehicleType {
    CAR = "autó",
    BOAT = "hajó",
    EITHER = "-"
}


@Entity()
export class Vehicle implements VehicleDTO {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    vin: string;

    @Column()
    brand: string;

    @Column()
    type: string;

    @Column()
    licensePlate: string;

    @Column()
    pricePerDay: number;

    @Column()
    odometer: number;

    @Column({
        type: "enum",
        enum: vehicleType,
    })
    vehicleType: vehicleType;

    @Column({
        type: "enum",
        enum: vehicleStatus,
        default: vehicleStatus.FREE
    })
    status: vehicleStatus;

    @OneToMany(() => Rent, (rent) => rent.vehicle)
    rents : RentDTO;

}
