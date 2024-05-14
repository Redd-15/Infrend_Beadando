import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Rent } from "./entity/Rent"
import { Vehicle } from "./entity/Vehicle"
import { Login } from "./entity/Login"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "infrend_carrental_app",
    synchronize: true,
    logging: true,
    entities: [User, Rent, Vehicle, Login],
    migrations: [],
    subscribers: [],
})
