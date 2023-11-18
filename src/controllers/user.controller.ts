
import { NextFunction, Request, Response} from "express";
 import { UserServices } from "../services/user.service";
 import { RequestExt } from '../interfaces/requestExt.interface';

//import createError from "http-errors";


export default class UserController {
    private static userServices = UserServices;

    // Registra un nuevo usuario
    static register = async (
        { body }: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const resp = await this.userServices.registerNewUser(body);
            res.status(200).send(resp);
        } catch (error) {
            next(error);
        }
    };

    // Inicio de sesion con un suario existente
    static login = async (
        { body }: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const resp = await this.userServices.loginUser(body);
            res.status(200).send(resp);
        } catch (error) {
            next(error);
        }
    };

    // Obtiene un usuario en  específico
    static getUserById = async (
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
    static updateUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const resp = await this.userServices.updateUser(id, req.body);
            if (!resp)
                return res.json({
                    error: `No se encontro el usuario con el Id:${id}`,
                });
            res.send(resp);
        } catch (error) {
            next(error);
        }
    };

    // Elimina un  usuario necesita ser administrador rol
    static deleteUser = async (
        req: RequestExt,
        res: Response,
        next: NextFunction,
    ) => {
        //Sideseas eliminar un usuario necesitas ser administrador
        // y tener el ID del usuario y tu contraseña de administrador
        const idUser = req.params.id;
        const passwordAdmin  = req.body.password;
        const userAdmin = req.user;
        try {
            await this.userServices.deleteUser(idUser, userAdmin, passwordAdmin);
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