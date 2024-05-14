import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";
import { RentDTO, UserDTO, VehicleDTO } from "../../../models"
import { User } from "./User";
import { Vehicle } from "./Vehicle";

export enum rentState {
    BOOKED = "foglalás leadva",
    CANCELLED = "visszamondva",
    VEHICLE_OUT = "autó kiadva",
    TO_BE_PAID = "fizetésre vár",
    PAID = "fizetve",
    EITHER = "-"
}

@Entity()
export class Rent implements RentDTO{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    calculatedPrice: number;

    @Column()
    state: rentState;
    
    @CreateDateColumn()
    timestampFrom: string;
    
    @CreateDateColumn()
    timestampTo: string;

    @ManyToOne(() => User, (user) => user.rents, {eager: true})
    renting : UserDTO;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.rents, {eager: true})
    vehicle : VehicleDTO;

}
