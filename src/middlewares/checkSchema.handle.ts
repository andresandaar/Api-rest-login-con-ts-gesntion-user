import { Request, Response, NextFunction } from 'express';
import SchemasUser from '../lib/schemasUser';
import UserSchemaValidator from '../helpers/userSchemaValidator';
// Aqui se validan cada uno de los campos del usuario y sus entradas
class CheckSchemaHandle extends UserSchemaValidator {
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
        this.isValid = this.validRegister(req.body, SchemasUser.register);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    login = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validLogin(req.body, SchemasUser.login);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    emailUpdata = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validEmailUpdata(req.body, SchemasUser.emailUpdate);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    passwordUpdata = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validPasswordUpdata(
            req.body,
            SchemasUser.passwordUpdate,
        );
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    userUpdate = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validUserUpdate(req.body, SchemasUser.userUpdate);
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };

    userUnregister = (req: Request, res: Response, next: NextFunction) => {
        this.isValid = this.validUserUnregister(
            req.body,
            SchemasUser.Unregister,
        );
        if (!this.isValid) return this.verifiedErrors(res);
        next();
    };
}
const checkSchemaHandle = new CheckSchemaHandle();
export default checkSchemaHandle;


//export default userRegisterDTOValidator
//https://www.w3schools.com/js/js_function_bind.asp
