import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { CarrentalTransferDTO, UserDTO } from "../../../models"
import { User } from "./User";

@Entity()
export class CarrentalTransfer implements CarrentalTransferDTO{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;
    
    @CreateDateColumn()
    timestamp: string;
    
    @ManyToOne(() => User, (user) => user.outgoingTransactions, {eager: true})
    source: UserDTO;
    
    @ManyToOne(() => User, (user) => user.incomingTransactions, {eager: true})
    destination: UserDTO;


}
