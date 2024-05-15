import { AppDataSource } from "../data-source";
import { Login } from "../entity/Login";
import { Controller } from "./base.controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginController extends Controller{
    
    repository = AppDataSource.getRepository(Login);

    create = async (req, res) => {

        try{
            const entity = this.repository.create(req.body as Login);
            delete entity.id;

            const insertedEntity = await this.repository.save(entity);
            
            entity.password = await bcrypt.hash(entity.password, 12);

            await this.repository.save(insertedEntity);

            res.json(insertedEntity);
        }catch(err){
            this.handleError(res, err);
        }
    }

    login = async (req, res) =>{

        try{

            const user = await this.repository.findOne({
                where: {email: req.body.email},
                select: ["id", "password"]
            });

            if (!user){
                return this.handleError(res, null, 401, 'Helytelen email vagy jelszó!');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            
            if (!passwordMatches){
                return this.handleError(res, null, 401, 'Helytelen email vagy jelszó!');
            }

            const token = jwt.sign({id: user.id}, 'mySecretKey', {expiresIn: '1w'});
            res.json({accessToken: token});

        }catch(err){
            this.handleError(res, err);
        }

    }


}