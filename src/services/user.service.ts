import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schemas';
import { BcryptHandle } from '../helpers/encrypt.handle';
import createError from 'http-errors';
import { jwtHandle } from '../helpers/jwt.handle';

export class UserServices {
    private static dataNotRequired: Array<String> = [
        '-password',
        '-createdAt',
        '-updatedAt',
    ];

    //Registra un nuevo usuario
    static registerNewUser = async (body: User) => {
        const { email, password, role } = body;
        const checkIs = await UserModel.findOne({ email });

        if (checkIs)
            throw createError(
                409,
                `El usuario con el correo ${email}  ya existe en la base de datos`,
            );

        const passwordEncrypt = await BcryptHandle.encrypt(password);
        body.password = passwordEncrypt;

        const newUser: any = await UserModel.create(body);
        const id = newUser._id.toString();

        const token = await jwtHandle.generateToken({ id, email, role });
        const resp = {
            message: 'Usuario creado correctamente',
            data: { id, email, role },
            token: token,
        };
        return resp;
    };

    static loginUser = async (body: Auth) => {
        const { email, password } = body;
        const user: any = await UserModel.findOne({ email });
        if (!user)
            throw createError(
                404,
                `El usuario con el correo ${email} no existe en la base de datos`,
            );
        const passwordPlane: string = password;
        const passwordEncrypt: string = user.password;

        const passwordCompare = await BcryptHandle.verifield(
            passwordPlane,
            passwordEncrypt,
        );
        if (!passwordCompare) throw createError(401, 'contraseña incorrecta');
        const id = user._id.toString();
        const role = user.role;
        const token = await jwtHandle.generateToken({ id, email, role });
        const resp = {
            message: 'Bienvenido...',
            token: token,
        };
        return resp;
    };

    //Traer todos los usuarios
    static getUsers = async () => {
        const response = await UserModel.find({}, this.dataNotRequired);
        return response;
    };

    static getUserById = async (id: string) => {
        const response = await UserModel.findById(id, this.dataNotRequired);
        return response;
    };

    static deleteUser = async (
        _idUserToDelete: string,
        payloadAdmin: any,
        passwordAdmin: string,
    ) => {
        //Sacamos los datos del admin atravez del payload (Sesion activa)
        const userAdmin = await UserModel.findById(payloadAdmin.id);
        if (!userAdmin)
            throw createError(
                404,
                `El usuario con el Id  ${payloadAdmin.id} no existe en la base de datos`,
            );
       //Sacamos los datos del usuario que se va a eliminar
        const userToDelete = await UserModel.findById(_idUserToDelete);

        if (!userToDelete)
            throw createError(
                404,
                `El usuario con el Id  ${_idUserToDelete} no existe en la base de datos`,
            );
         //Verificamos la contraseña encriptada con la plana del admin
        const passwordEncrypt: string = userAdmin.password;
        const passwordPlane: string = passwordAdmin;
        const passwordCompare = await BcryptHandle.verifield(
            passwordPlane,
            passwordEncrypt,
        );
        if (!passwordCompare) throw createError(401, 'La contraseña es  incorrecta');
        //Si todo es correcto eliminamos al usuario en cuention
        const response = await UserModel.findByIdAndDelete(_idUserToDelete);
        return response;
    };

    static updateUser = async (id: string, data: User) => {
        const response = await UserModel.findByIdAndUpdate(id, data, {
            fields: this.dataNotRequired,
            new: true,
        });
        return response;
    };
}
