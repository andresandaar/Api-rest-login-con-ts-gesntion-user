import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schemas';
import { BcryptHandle } from '../helpers/bcrypt.handle';
import createError from 'http-errors';
import { jwtHandle } from '../helpers/jwt.handle';

export class UserServices {
    //Registra un nuevo usuario
    static registerNewUser = async (body:User) => {
        const email=body.email
        const checkIs = await UserModel.findOne({email});
        if (checkIs)
            throw createError(
                409,
                `El usuario con el correo ${body.email}  ya existe en la base de datos`,
            );
        const passwordEncrypt = await BcryptHandle.encrypt(body.password);
        body.password=passwordEncrypt
        const registerNewUser = await UserModel.create(body);
        return registerNewUser;
    };

    static loginUser = async ({ email, password }: Auth) => {
        const user: any = await UserModel.findOne({ email });
        if (!user)
            throw createError(
                404,
                `El usuario con el correo ${email} no existe en la base de datos`,
            );
        const passwordEncrypt: string = user.password;
        const passwordPlane: string = password;
        const passwordCompare = await BcryptHandle.verifield(passwordPlane,passwordEncrypt);
        if (!passwordCompare) throw createError(401, 'contraseña incorrecta');
        const id = user._id.toString();
        const role =user.role
        const token = jwtHandle.generateToken({ id, email, role });
        return token;
    };
    //Traer todos los usuarios
    static getUsers = async () => {
        const response = await UserModel.find({}, [
            '-password',
            '-createdAt',
            '-updatedAt',
        ]);
        return response;
    };

    static getUserById = async (id: string) => {
        const response = await UserModel.findById(id, [
            '-password',
            '-createdAt',
            '-updatedAt',
        ]);
        return response;
    };

    static deleteUser = async ({ email, password }: Auth) => {
        const user: any = await UserModel.findOne({ email });
        if (!user)
            throw createError(
                404,
                `El usuario con el correo ${email} no existe en la base de datos`,
            );
        const passwordEncrypt: string = user.password;
        const passwordPlane: string = password;
        const passwordCompare = await BcryptHandle.verifield(
            passwordPlane,
            passwordEncrypt,
        );
        if (!passwordCompare) throw createError(401, 'La contraseña es  incorrecta');
         const id = user._id.toString();
        const response = await UserModel.findByIdAndDelete(id);
        return response;
    };

    static updateUser = async (id: string, data: User) => {
        const response = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        return response;
    };
}
