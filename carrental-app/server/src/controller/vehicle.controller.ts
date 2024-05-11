import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity/Vehicle";
import { Controller } from "./base.controller";

export class VehicleController extends Controller{
    repository = AppDataSource.getRepository(Vehicle);


    getOneById = async (req, res) => {
        this.getOne(req,res);
        return;
    };

    getByType = async (req, res) => {

        try {
            
            const type = req.params.type;
            const entity = await this.repository.findBy({ type: type});

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
            const entity = await this.repository.findBy({ status: status});

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

}