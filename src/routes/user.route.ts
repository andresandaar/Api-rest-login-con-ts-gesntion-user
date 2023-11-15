import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import userRegisterDTO from '../middlewares/user-register.dto';
//import sessionHandler from '../middlewares/session.handle';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router
            .get('/profile', [userRegisterDTO], UserController.getItem)
            .post('/register', [userRegisterDTO], (req: Request, res: Response) => {
                res.send();
            });
        /*   .post('/login',UserController.addUser)
          .patch('/update-data',UserController.updateUser)
          .patch('/update-email',UserController.updateUser)
          .patch('/update-password',UserController.updateUser)
          .delete('/unregister',UserController.deleteUser) */
        //router.get('/:id',[checkJwt],UserController.getById);
    }
}

const userRouter = new UserRouter();
export default userRouter.router;
