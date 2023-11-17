import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validator from '../middlewares/validatorUser';
import ValidSession from '../middlewares/session.handle';
import { checkRole } from '../middlewares/role';
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
            .get('/profile/:id', UserController.getUser)
            .get('/profiles', UserController.getUsers)
            .post(
                '/register',
                [validator.register],
                UserController.registerUser,
            )
            .post('/login', [validator.login], UserController.loginUser)

            .patch(
                '/update/:id',
                [ValidSession.checkJwt,checkRole(['Admin']), validator.userUpdate],
                UserController.updateUser,
            )
            .patch(
                '/update-email/:id',
                [ValidSession.checkJwt, validator.emailUpdata],
                UserController.updateEmail,
            )
            .patch(
                '/update-password/:id',
                [ValidSession.checkJwt, validator.passwordUpdata],
                UserController.updatePassword,
            )
            .delete(
                '/unregister',
                [ValidSession.checkJwt, validator.userUnregister],
                UserController.deleteUser,
            );
    }
}

const userRouter = new UserRouter();
export default userRouter.router;
