import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CarrentalTransfer } from "./CarrentalTransfer";
import { UserDTO } from "../../../models";

@Entity()
export class User implements UserDTO {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerId : string;

    @Column()
    name: string;

    @Column()
    address:string;

    @Column()
    phone: string;

    @Column()
    idCard: string;

    @OneToMany(() => CarrentalTransfer, (transaction) => transaction.source)
    outgoingTransactions : CarrentalTransfer[];

    @OneToMany(() => CarrentalTransfer, (transaction) => transaction.destination)
    incomingTransactions : CarrentalTransfer[];
}
