import { Type } from '@sinclair/typebox';

export default class DtoTypes {

    public static _idType = Type.String({
        format: 'uuid',
        errorMessage: {
            type: 'El tipo de _id no es válido,debe ser un string',
            format: 'El formato de  _id no es válido, debe ser un uuid',
        },
    });

    public static nameType = Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength:
                'El name debe de tener al menos 2 caracteres de longitud',
            maxLength:
                'El name debe de tener como máximo 20 caracteres de longitud',
        },
    });

    public static surnameType = Type.String({
        minLength: 4,
        maxLength: 50,
        errorMessage: {
            minLength:
                'El surname debe de tener al menos 4 caracteres de longitud',
            maxLength:
                'El surname debe de tener como máximo 50 caracteres de longitud',
        },
    });

    public static emailType = Type.String({
        format: 'email',
        errorMessage: {
            type: 'El tipo del email no es válido, debe ser un string',
            format: 'El formato del email no es válido, debe cumplir con el RFC 5322',
        },
    });

    public static passwordType = Type.String({
        format: 'password',
        minLength: 10,
        maxLength: 25,
        errorMessage: {
            type: 'El tipo de password no es válido, debe ser un string ',
            format: 'El formato de la password debe de tener por lo menos una mayúscula, una minúscula y un número',
            minLength:
                'El password debe de tener al menos 10 caracteres de longitud',
            maxLength:
                'El password debe de tener como máximo 25 caracteres de longitud',
        },
    });
    
}
