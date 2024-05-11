import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";
import { RentDTO, UserDTO, VehicleDTO } from "../../../models"
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity()
export class Rent implements RentDTO{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
    
    @CreateDateColumn()
    timestampFrom: string;
    
    @CreateDateColumn()
    timestampTo: string;

    @ManyToOne(() => User, (user) => user.rents, {eager: true})
    renting : UserDTO;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.rents, {eager: true})
    vehicle : VehicleDTO;

}
