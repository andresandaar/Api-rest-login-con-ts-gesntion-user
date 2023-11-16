/* import { Request, Response, NextFunction } from 'express';
import { TObject, Type } from '@sinclair/typebox';
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import {
    _idDtoSchema,
    nameDtoSchema,
    surnameDtoSchema,
    emailDtoSchema,
    passwordDtoSchema,
} from '../lib/dto-types';

class UserValidatorDto {
    private ajv: Ajv;
    private validateSchema:ValidateFunction;

    constructor() {
        this.ajv = new Ajv({ allErrors: true });
        addFormats(this.ajv, ['uuid', 'email'])
            .addKeyword('kind')
            .addKeyword('modifier');
        this.ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
        addErrors(this.ajv);

        const RegisterDTOSchema: TObject<{}> = Type.Object({
            _id:_idDtoSchema,
            name: nameDtoSchema,
            surname: surnameDtoSchema,
            email:emailDtoSchema,
            password: passwordDtoSchema
        });

        this.validateSchema = this.ajv.compile(RegisterDTOSchema);
    }

    validateDTO(req: Request, res: Response, next: NextFunction) {
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
    }
}

const userValidatorDto  = new UserValidatorDto();
const userValidatorRegister = userValidatorDto.validateDTO.bind(userValidatorDto);
export { userValidatorRegister }; */
//export default userRegisterDTOValidator
//https://www.w3schools.com/js/js_function_bind.asp
