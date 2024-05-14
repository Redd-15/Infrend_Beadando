import { AppDataSource } from "../data-source";
import { Rent } from "../entity/Rent";
import { Controller } from "./base.controller";

export class RentController extends Controller{
    repository = AppDataSource.getRepository(Rent);


    getByState = async (req, res) => {

        try {
            
            const state = req.params.state;
            const entity = await this.repository.findBy({ state: state});

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