import express from 'express';
import { UserController } from './controller/user.controller';
import { VehicleController } from './controller/vehicle.controller';
import { RentController } from './controller/rent.controller';
import { LoginController } from './controller/login.controller';
import { checkUser } from './protect-routes';

export function getRouter() {

    const router = express.Router();

    const userController = new UserController();

    router.get('/users', userController.getAll);
    router.get('/user/:id', userController.getOne);
    router.post('/user', checkUser, userController.create);
    router.put('/user', checkUser, userController.update);
    router.delete('/user/:id', checkUser, userController.delete);

    const vehicleController = new VehicleController();

    router.get('/vehicles', vehicleController.getAll);
    router.get('/vehicle/id/:id', vehicleController.getOneById);
    router.get('/vehicle/status/:status&:vtype', vehicleController.getByStatus);
    router.get('/vehicle/type/:type&:status&:vtype', vehicleController.getByType);
    router.get('/vehicle/lplate/:lplate&:status&:vtype', vehicleController.getByLPlate);
    router.get('/vehicle/vtype/:vtype', vehicleController.getByVType);    
    router.post('/vehicle', checkUser, vehicleController.create);
    router.put('/vehicle', checkUser, vehicleController.update);
    router.delete('/vehicle/:id', checkUser, vehicleController.delete);

    const rentController = new RentController();

    router.get('/rents', rentController.getAll);
    router.get('/rent/id/:id', rentController.getOne);
    router.get('/rent/state/:state', rentController.getByState);
    router.post('/rent', checkUser, rentController.create);
    router.put('/rent', checkUser, rentController.update);
    router.delete('/rent/:id', checkUser, rentController.delete);

    const loginController = new LoginController();

    router.post('/register', loginController.create);
    router.post('/login', loginController.login);

    return router;
}