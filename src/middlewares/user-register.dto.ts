import { Request, Response, NextFunction } from "express"
import {TObject, Type  } from "@sinclair/typebox";
import  Ajv  from "ajv";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const RegisterDTOSchema: TObject<{}> = Type.Object({

    _id: Type.String({
        format: 'uuid',
        errorMessage: {
            type: 'El tipo de _id no es válido,debe ser un string',
            format: 'El formato de  _id no es válido, debe ser un uuid',
        },
    }),

    name: Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength: 'El name debe de tener almenos 2 caracteres de longitud',
            maxLength:
                'El name debe de tener como maximo 20 caracteres de longitud',
        },
    }),

    surname: Type.String({
        minLength: 4,
        maxLength: 50,
        errorMessage: {
            minLength:
                'El surname debe de tener almenos 2 caracteres de longitud',
            maxLength:
                'El surname debe de tener como maximo 20 caracteres de longitud',
        },
    }),

    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'El tipo del email no es válido,debe ser un string',
            format: 'El formato del email no es válido, debe cumplir con el RFC 5322',
        },
    }),

    password: Type.String({
        format: 'password',
        minLength: 10,
        maxLength: 25,
        errorMessage: {
            type: 'El tipo de password no es valido, debe ser un string ',
            format: 'El formato de la password debe de tener por lo menos una mayuscula, una minuscula y un número',
            minLength:
                'El password debe de tener almenos 10 caracteres de longitud',
            maxLength:
                'El password debe de tener como maximo 25 caracteres de longitud',
        },
    }),

});

const ajv = new Ajv({allErrors:true});
addFormats(ajv, ['uuid','email']).addKeyword('kind').addKeyword('modifier');
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addErrors(ajv);
const validateSkema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO=(req: Request, res: Response,  next: NextFunction)=>{
   const isDTOValid= validateSkema(req.body);
   console.log(validateSkema.errors);
   if (!isDTOValid) return res.status(400).json({errors: validateSkema.errors?.map((error)=>{
    return {
        value: error.instancePath,
        message: error.message,
    };
    
})});
   next();
}
export default userRegisterDTO;
