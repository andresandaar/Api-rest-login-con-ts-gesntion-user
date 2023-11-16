import { Request, Response, NextFunction } from 'express';
import { TObject, TProperties, Type } from '@sinclair/typebox';
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import DtoSchemas from '../../lib/schemasUser';


class UserValidatorDto {
    private ajv: Ajv;
    private validateSchema!: ValidateFunction;

    constructor() {
        this.ajv = new Ajv({ allErrors: true });
        addFormats(this.ajv, ['uuid', 'email'])
            .addKeyword('kind')
            .addKeyword('modifier');
        this.ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
        addErrors(this.ajv);
    }

    createDTOSchema(fields: TProperties): TObject<{}> {
        return Type.Object(fields);
    }

    validateDTO(schema: TObject<{}>) {
        return (req: Request, res: Response, next: NextFunction) => {
            this.validateSchema=this.ajv.compile(schema);
            const isDTOValid = this.validateSchema(req.body);
            if (!isDTOValid) {
                return res.status(400).json({
                    errors: this.validateSchema.errors?.map((error) => {
                        return {
                            value: error.instancePath,
                            message: error.message,
                        };
                    }),
                });
            }

            next();
        };
    }

}

//validador para el registro de usuarios
//Intanciamos la clase UserValidatorDto
const userValidDto = new UserValidatorDto();
//Pasamos un schema a la funcion createDTOSchem e
const schemaRegister = userValidDto.createDTOSchema(DtoSchemas.userRegisterSchema);
const userValidatorRegister = userValidDto.validateDTO(schemaRegister);

//validador para el login de usuarios
const schemaLogin = userValidDto.createDTOSchema(DtoSchemas.userLoginSchema);
const userValidatorLogin = userValidDto.validateDTO(schemaLogin);

//validador para  actualizar los datos del usuarios
const schemaUpdataUser= userValidDto.createDTOSchema(DtoSchemas.userUpdateSchema);
const userValidatorUpdataUser = userValidDto.validateDTO(schemaUpdataUser);


//validador para actualizar el email  del usuarios
const schemaUpdataEmail= userValidDto.createDTOSchema(DtoSchemas.emailUpdateSchema);
const userValidatorUpdataEmail = userValidDto.validateDTO(schemaUpdataEmail);

//validador para actualizar la contraseña del usuarios
const schemaUpdataPassword= userValidDto.createDTOSchema(DtoSchemas.passwordUpdateSchema);
const userValidatorUpdataPassword= userValidDto.validateDTO(schemaUpdataPassword);

export {
    userValidatorRegister,
    userValidatorLogin,
    userValidatorUpdataUser,
    userValidatorUpdataEmail,
    userValidatorUpdataPassword,
};

//export default userRegisterDTOValidator
//https://www.w3schools.com/js/js_function_bind.asp