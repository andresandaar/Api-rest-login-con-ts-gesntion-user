
import { TProperties } from '@sinclair/typebox';
import DtoTypes from './dto-types';

export default class DtoSchemas {
    // Esquema para el registro de usuarios
    public static userRegisterSchema: TProperties = {
        _id: DtoTypes._idDtoSchema,
        name: DtoTypes.nameDtoSchema,
        surname: DtoTypes.surnameDtoSchema,
        email: DtoTypes.emailDtoSchema,
        password: DtoTypes.passwordDtoSchema,
    };
    // Esquema para el login de usuarios
    public static userLoginSchema: TProperties = {
        email: DtoTypes.emailDtoSchema,
        password: DtoTypes.passwordDtoSchema,
    };
    // Esquema para actualizar un  usuarios
    public static userUpdateSchema: TProperties = {
        name: DtoTypes.nameDtoSchema,
        surname: DtoTypes.surnameDtoSchema,
    };
    // Esquema para actualizar el correo del usuario
    public static emailUpdateSchema: TProperties = {
        email: DtoTypes.emailDtoSchema,
    };
    // Esquema para actualizar la contraseña del usuarios
    public static passwordUpdateSchema: TProperties = {
        password: DtoTypes.passwordDtoSchema,
    };

    // ... otros esquemas
}
