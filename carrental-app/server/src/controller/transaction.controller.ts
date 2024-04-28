import { AppDataSource } from "../data-source"
import { CarrentalTransfer } from "../entity/CarrentalTransfer"
import { Controller } from "./base.controller"

export class TransactionController extends Controller{

    repository = AppDataSource.getRepository(CarrentalTransfer);

    create = async (req, res) => {

        try {
            
            const entity = this.repository.create(req.body as object);
            delete entity.id;
            delete entity.timestamp;

            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);

        } catch (err) {
            this.handleError(res, err);
        }
    };

    transactionOfUser = async(req, res) =>{
        try {
            const userId = req.params.userId;

            const transactions = await this.repository.find({
                where: {
                    source: {id: userId}
                }
            });

            res.json(transactions);

        } catch (err) {
            this.handleError(res,err);
        }

    }

}