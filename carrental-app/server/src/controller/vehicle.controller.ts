import { And } from "typeorm";
import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity/Vehicle";
import { Controller } from "./base.controller";
import { stat } from "fs";

export class VehicleController extends Controller{
    repository = AppDataSource.getRepository(Vehicle);


    getOneById = async (req, res) => {
        this.getOne(req,res);
        return;
    };

    getByType = async (req, res) => {

        try {
            
            const type = req.params.type;
            const vtype = req.params.vtype;
            const status = req.params.status;
            var entity;

            if(vtype != '-' && status != '-')
                {entity = await this.repository.findBy({ type: type, vehicleType: vtype, status: status});}

            else if(vtype == '-' && status != '-')
                {entity = await this.repository.findBy({ type: type, status: status});}

            else if(vtype != '-' && status == '-')
                {entity = await this.repository.findBy({ type: type, vehicleType: vtype});}

            else
                {entity = await this.repository.findBy({ type: type});}

            if (!entity) {

                this.handleError(res, null, 404, 'Entity not found!');
                return;
            }

            res.json(entity);

        } catch (err) {
            this.handleError(res, err);
        }
    };

    getByStatus = async (req, res) => {

        try {
            
            const status = req.params.status;
            const vtype = req.params.vtype;
            var entity;

            if(vtype != '-')
                {entity = await this.repository.findBy({ status: status, vehicleType: vtype});}
            else
                {entity = await this.repository.findBy({ status: status});}
            

            if (!entity) {

                this.handleError(res, null, 404, 'Entity not found!');
                return;
            }

            res.json(entity);

        } catch (err) {
            this.handleError(res, err);
        }
    };

    getByVType = async (req, res) => {

        try {
            
            const vType = req.params.vtype;
            const entity = await this.repository.findBy({ vehicleType: vType});

            if (!entity) {

                this.handleError(res, null, 404, 'Entity not found!');
                return;
            }

            res.json(entity);

        } catch (err) {
            this.handleError(res, err);
        }
    };

    getByLPlate = async (req, res) => {

        try {
            
            const lPlate = req.params.lplate;
            const vtype = req.params.vtype;
            const status = req.params.status;
            var entity;

            if(vtype != '-' && status != '-')
                {entity = await this.repository.findBy({ licensePlate: lPlate, vehicleType: vtype, status: status});}

            else if(vtype == '-' && status != '-')
                {entity = await this.repository.findBy({ licensePlate: lPlate, status: status});}

            else if(vtype != '-' && status == '-')
                {entity = await this.repository.findBy({ licensePlate: lPlate, vehicleType: vtype});}

            else
                {entity = await this.repository.findBy({ licensePlate: lPlate});}
            

            if (!entity) {

                this.handleError(res, null, 404, 'Entity not found!');
                return;
            }

            res.json(entity);

        } catch (err) {
            this.handleError(res, err);
        }
    };

}