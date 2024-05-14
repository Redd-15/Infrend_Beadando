import express from 'express';
import { UserController } from './controller/user.controller';
import { VehicleController } from './controller/vehicle.controller';
import { RentController } from './controller/rent.controller';

export function getRouter() {

    const router = express.Router();

    const userController = new UserController();

    router.get('/users', userController.getAll);
    router.get('/user/:id', userController.getOne);
    router.post('/user', userController.create);
    router.put('/user', userController.update);
    router.delete('/user/:id', userController.delete);

    const vehicleController = new VehicleController();

    router.get('/vehicles', vehicleController.getAll);
    router.get('/vehicle/id/:id', vehicleController.getOneById);
    router.get('/vehicle/status/:status&:vtype', vehicleController.getByStatus);
    router.get('/vehicle/type/:type&:status&:vtype', vehicleController.getByType);
    router.get('/vehicle/lplate/:lplate&:status&:vtype', vehicleController.getByLPlate);
    router.get('/vehicle/vtype/:vtype', vehicleController.getByVType);    
    router.post('/vehicle', vehicleController.create);
    router.put('/vehicle', vehicleController.update);
    router.delete('/vehicle/:id', vehicleController.delete);

    const rentController = new RentController();

    router.get('/rents', rentController.getAll);
    router.get('/rent/id/:id', rentController.getOne);
    router.get('/rent/state/:state', rentController.getByState);
    router.post('/rent', rentController.create);
    router.put('/rent', rentController.update);
    router.delete('/rent/:id', rentController.delete);

    return router;
}