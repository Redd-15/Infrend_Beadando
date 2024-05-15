import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { LoginDTO} from "../../../models";

@Entity()
export class Login implements LoginDTO {

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    password2: string;
}
