import { Request, Response, NextFunction } from 'express';
import Schemas from '../lib/schemasUser';
import ValidSchemaUser from '../Helpers/validSchemaUser';
// Aqui se validan cada uno de los campos del usuario y sus entradas
class ValidatorUser extends ValidSchemaUser {
    private isValid!: boolean;

    constructor() {
        super();
    }
    //Retorna un conjunto de errores
    private verifiedErrors(res: Response) {
        return res.status(400).json({
            errors: this.validSchemaErrors(),
        });
    }

    //Funciones que validan los datos el usuario, segun sea el caso
    register = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validRegister(req.body, Schemas.register);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    login = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validLogin(req.body, Schemas.login);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    emailUpdata = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validEmailUpdata(req.body, Schemas.emailUpdate);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    passwordUpdata = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validPasswordUpdata(
            req.body,
            Schemas.passwordUpdate,
        );
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    userUpdate = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validUserUpdate(req.body, Schemas.userUpdate);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };
    userUnregister = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validUserUnregister(req.body, Schemas.Unregister);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };
}
const validUser = new ValidatorUser();
export default validUser;


//export default userRegisterDTOValidator
//https://www.w3schools.com/js/js_function_bind.asp
