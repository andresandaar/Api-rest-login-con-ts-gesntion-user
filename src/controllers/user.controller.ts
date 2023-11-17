
import { NextFunction, Request, Response, json, response } from "express";
 import { UserServices } from "../services/user.service";
 import { RequestExt } from '../interfaces/requestExt.interface';
/*";
import { ValidateFields } from "../utils/validate.fields";
 */
//import createError from "http-errors";


export default class UserController {
    private static userServices = UserServices;

    // Agrega o registra un nuevo usuario
    static registerUser = async (
        { body }: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const responseUser = await this.userServices.registerNewUser(body);
            res.send(responseUser);
        } catch (error) {
            next(error);
        }
    };

    // Agrega un nuevo elemento
    static loginUser = async (
        { body }: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { email, password } = body;
        try {
            const responseUser = await this.userServices.loginUser({
                email,
                password,
            });
            res.send(responseUser);
        } catch (error) {
            next(error);
        }
    };

    // Obtiene un usuario en  específico
    static getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        //const id = user._id.toString();
        try {
            const resp = await this.userServices.getUserById(id);
            if (!resp)
                return res.json({
                    error: `No se encontro el usuario con el Id:${id}`,
                });
            res.send(resp);
        } catch (error) {
            next(error);
        }
    };

    // Obtiene una lista de usuarios
    static getUsers = async (
        req: RequestExt,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const resposeItem: any[] = await this.userServices.getUsers();
            res.send({ data: resposeItem, user: req?.user });
        } catch (error) {
            next(error);
        }
    };

    // Actualiza un usuario en espesifico
    static updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const resp = await this.userServices.updateUser(id,req.body);
                if (!resp)
                    return res.json({
                        error: `No se encontro el usuario con el Id:${id}`,
                    });
                res.send(resp);
        } catch (error) {
            next(error);
        }
    };

    // Elimina un  usuario
    static deleteUser = async (
        { body }: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await this.userServices.deleteUser(body);
            res.send('Usuario eliminado con exito');
        } catch (error) {
            next(error);
        }
    };

    // Actualiza el email del usuario
    static updateEmail = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {};

    // Actualiza la contraseña del usuario
    static updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        res.json('hola');
    };
}