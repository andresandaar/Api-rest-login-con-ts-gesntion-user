import { Request, Response, NextFunction } from "express"
//import { AppDataSource } from "../data-source"
//import {User} from "../entity/User";
import { RequestExt } from "../interfaces/requestExt.interface";
import { roleType } from "../interfaces/user.interface";

//https://openwebinars.net/blog/que-es-json-web-token-y-como-funciona/
export const checkRole = (roles: Array<roleType>) => {
    return async (req: RequestExt, res: Response, next: NextFunction) => {
        const role = res.locals.payload.role;
        console.log(role)
        /*  const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            return res.status(401).send({ message: 'Not authorized' });
        } */
        //Check
        //const { role } = user;
        if (roles.includes(role)) {
            next();
        } else {
            res.status(401).send({ message: 'Not authorized' });
        }
    };
};