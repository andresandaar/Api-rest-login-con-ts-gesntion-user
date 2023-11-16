import { Request, Response, NextFunction } from 'express';
import Schemas from '../lib/schemasUser';
import SchemaValidator from '../Helpers/schemaValidator';

class UserValidatorDto extends SchemaValidator {
    private isDTOValid!: boolean;

    constructor() {
        super();
    }

    private verifyDto(res: Response) {
        return res.status(400).json({
            errors: this.validateSchema.errors?.map((error) => {
                return {
                    value: error.instancePath,
                    message: error.message,
                };
            }),
        });
    }

    register = (req: Request, res: Response, next: NextFunction) => {
        this.isDTOValid = this.validateDTO(req.body, Schemas.register);
        if (!this.isDTOValid) return this.verifyDto(res);
        next();
    };

    login = (req: Request, res: Response, next: NextFunction) => {
        this.isDTOValid = this.validateDTO(req.body, Schemas.login);
        if (!this.isDTOValid) return this.verifyDto(res);
        next();
    };

    emailUpdata = (req: Request, res: Response, next: NextFunction) => {
        this.isDTOValid = this.validateDTO(req.body, Schemas.emailUpdate);
        if (!this.isDTOValid) return this.verifyDto(res);
        next();
    };

    passwordUpdata = (req: Request, res: Response, next: NextFunction) => {
        this.isDTOValid = this.validateDTO(req.body, Schemas.passwordUpdate);
        if (!this.isDTOValid) return this.verifyDto(res);
        next();
    };
    userUpdate = (req: Request, res: Response, next: NextFunction) => {
        this.isDTOValid = this.validateDTO(req.body, Schemas.userUpdate);
        if (!this.isDTOValid) return this.verifyDto(res);
        next();
    };
}
const userValidDto = new UserValidatorDto();
export default userValidDto;


//export default userRegisterDTOValidator
//https://www.w3schools.com/js/js_function_bind.asp
