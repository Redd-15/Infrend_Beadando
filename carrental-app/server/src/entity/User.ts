import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Rent } from "./Rent";
import { RentDTO, UserDTO } from "../../../models";

@Entity()
export class User implements UserDTO {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerId: string;

    @Column()
    name: string;

    @Column()
    address:string;

    @Column()
    phone: string;

    @Column()
    idCard: string;

    @Column()
    driversLicense: string;

    @OneToMany(() => Rent, (rent) => rent.renting)
    rents: RentDTO
}
