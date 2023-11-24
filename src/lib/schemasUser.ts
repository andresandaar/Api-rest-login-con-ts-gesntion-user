import { TObject, Type } from '@sinclair/typebox';
import DtoTypes from './typesUser';

export default class SchemasUser {
  private static propertiesRequired = {
    name: 'La propieda name es requerida',
    surname: 'La propiedad surname es requerida',
    role: 'La propiedad role es requerida',
    email: 'La propiedad email es requerida',
    password: 'La propiedad password es requerida',
    oldPassword: 'La propiedad oldPassword es requerida',
    newPassword: 'La propiedad newPassword es requerida'
  };

  // Esquema para el registro de usuarios
  public static register: TObject<{}> = Type.Object(
    {
      //_id: DtoTypes._idType,
      name: DtoTypes.nameType,
      surname: DtoTypes.surnameType,
      role: DtoTypes.roleType,
      email: DtoTypes.emailType,
      password: DtoTypes.passwordType
    },
    {
      additionalProperties: false,
   /*    errorMessage: {
        additionalProperties: 'El tipo de propiedad no es valida ',
        required: {
          name: this.propertiesRequired.name,
          surname: this.propertiesRequired.surname,
          role: this.propertiesRequired.role,
          email: this.propertiesRequired.email,
          password: this.propertiesRequired.password
        }
      } */
    }
  );
  // Esquema para el login de usuarios
  public static login: TObject<{}> = Type.Object(
    {
      email: DtoTypes.emailType,
      password: DtoTypes.passwordType
    },
    {
      additionalProperties: false,
    }
  );
  // Esquema para actualizar un  usuarios
  public static userUpdate: TObject<{}> = Type.Object(
    {
      name: DtoTypes.nameType,
      surname: DtoTypes.surnameType
    },
    {
      additionalProperties: false,
    }
  );
  // Esquema para actualizar el correo del usuario
  public static emailUpdate: TObject<{}> = Type.Object(
    {
      email: DtoTypes.emailType,
      password: DtoTypes.passwordType
    },
    {
      additionalProperties: false,
    }
  );
  // Esquema para actualizar la contraseña del usuarios
  public static passwordUpdate: TObject<{}> = Type.Object(
    {
      oldPassword: DtoTypes.passwordType,
      newPassword: DtoTypes.passwordType
    },
    {
      additionalProperties: false,
    }
  );

  // Esquema para eliminar la cuenta del usuarios
  public static Unregister: TObject<{}> = Type.Object(
    {
      password: DtoTypes.passwordType
    },
    {
      additionalProperties: false,
    }
  );

  // ... otros esquemas
}
