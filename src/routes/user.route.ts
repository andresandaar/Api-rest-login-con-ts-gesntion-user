import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import {  userValidatorLogin, userValidatorRegister, userValidatorUpdataEmail, userValidatorUpdataPassword, userValidatorUpdataUser } from '../middlewares/user-validator.dto';
//import sessionHandler from '../middlewares/session.handle';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router
            .get('/profile', UserController.getItem)
            .post(
                '/register',
                [userValidatorRegister],
                (req: Request, res: Response) => {
                    res.send();
                },
            )
            .post(
                '/login',
                [userValidatorLogin],
                (req: Request, res: Response) => {
                    res.send('ok login');
                },
            )
            .patch(
                '/update-data',
                [userValidatorUpdataUser],
                (req: Request, res: Response) => {
                    res.send('ok login');
                },
            )
            .patch(
                '/update-email',
                [userValidatorUpdataEmail],
                (req: Request, res: Response) => {
                    res.send('ok login');
                },
            )
            .patch(
                '/update-password',
                [userValidatorUpdataPassword],
                (req: Request, res: Response) => {
                    res.send('ok login');
                },
            );
        /*   .post('/login',[userValidatorRegister],UserController.addUser)
          .patch('/update-data',UserController.updateUser)
          .patch('/update-email',UserController.updateUser)
          .patch('/update-password',UserController.updateUser)
          .delete('/unregister',UserController.deleteUser) */
        //router.get('/:id',[checkJwt],UserController.getById);
    }
}

const userRouter = new UserRouter();
export default userRouter.router;
