import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validator from '../middlewares/user-validator.dto';
//import sessionHandler from '../middlewares/session.handle';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        //http://localhost:3000/user/profiles
        this.router
            .get('/profile:id', UserController.getUser)
            .get('/profiles', UserController.getUsers)
            .post('/register', [validator.register], UserController.registerUser)
            .post('/login', [validator.login], UserController.loginUser)
            .patch(
                '/update:id',
                [validator.userUpdate],
                UserController.updateUser,
            )
            .patch(
                '/update-email:id',
                [validator.emailUpdata],
                UserController.updateEmail,
            )
            .patch(
                '/update-password:id',
                [validator.passwordUpdata],
                UserController.updatePassword,
            )
            .delete('/unregister', UserController.deleteUser);
    }
}

const userRouter = new UserRouter();
export default userRouter.router;
