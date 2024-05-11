import { AppDataSource } from "../data-source";
import { Rent } from "../entity/Rent";
import { Controller } from "./base.controller";

export class RentController extends Controller{
    repository = AppDataSource.getRepository(Rent);




}