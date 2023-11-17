
import { TObject,Type  } from '@sinclair/typebox';
import DtoTypes from './typesUser';

export default class SchemasUser {
    // Esquema para el registro de usuarios
    public static register: TObject<{}> = Type.Object(
        {
            //_id: DtoTypes._idType,
            name: DtoTypes.nameType,
            surname: DtoTypes.surnameType,
            role: DtoTypes.roleType,
            email: DtoTypes.emailType,
            password: DtoTypes.passwordType,
        },
        {
            additionalProperties: false,
            errorMessage: {
                additionalProperties: 'El tipo de propiedad no es valida ',
            },
        },
    );
    // Esquema para el login de usuarios
    public static login: TObject<{}> = Type.Object(
        {
            email: DtoTypes.emailType,
            password: DtoTypes.passwordType,
        },
        { additionalProperties: false },
    );
    // Esquema para actualizar un  usuarios
    public static userUpdate: TObject<{}> = Type.Object(
        {
            name: DtoTypes.nameType,
            surname: DtoTypes.surnameType,
        },
        { additionalProperties: false },
    );
    // Esquema para actualizar el correo del usuario
    public static emailUpdate: TObject<{}> = Type.Object(
        {
            email: DtoTypes.emailType,
            password: DtoTypes.passwordType,
        },
        { additionalProperties: false },
    );
    // Esquema para actualizar la contraseña del usuarios
    public static passwordUpdate: TObject<{}> = Type.Object(
        {
            oldPassword: DtoTypes.passwordType,
            newPassword: DtoTypes.passwordType,
        },
        { additionalProperties: false },
    );

    // Esquema para eliminar la cuenta del usuarios
    public static Unregister: TObject<{}> = Type.Object(
        {
            email: DtoTypes.emailType,
            password: DtoTypes.passwordType,
        },
        { additionalProperties: false },
    );

    // ... otros esquemas
}
