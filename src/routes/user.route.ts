import { Router } from 'express';
import UserController from '../controllers/user.controller';
import CheckSchema from '@middlewares/userSchema.handle';
import AuthHandle from '../middlewares/auth.handle';
import RoleHandle from '../middlewares/role.handle';
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
            .post('/register', [CheckSchema.register], UserController.register)

            .post('/login', [CheckSchema.login], UserController.login)

            .get('/profile/:id', UserController.getUserById)

            .get('/profiles', UserController.getUsers)

            .patch(
                '/update/:id',
                [
                    AuthHandle.checkJwt,
                    RoleHandle.checkRole(['Admin']),
                    CheckSchema.userUpdate,
                ],
                UserController.updateUserById,
            )

            .patch(
                '/update-email/:id',
                [AuthHandle.checkJwt, CheckSchema.emailUpdata],
                UserController.updateEmail,
            )

            .patch(
                '/update-password/:id',
                [AuthHandle.checkJwt, CheckSchema.passwordUpdata],
                UserController.updatePassword,
            )
            .delete(
                '/unregister',
                [AuthHandle.checkJwt, CheckSchema.userUnregister],
                UserController.deleteUser,
            );
    }
}

const userRouter = new UserRouter();
export default userRouter.router;
