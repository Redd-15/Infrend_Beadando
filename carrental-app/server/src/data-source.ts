import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { CarrentalTransfer } from "./entity/CarrentalTransfer"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "infrend_carrental_app",
    synchronize: true,
    logging: true,
    entities: [User, CarrentalTransfer],
    migrations: [],
    subscribers: [],
})
