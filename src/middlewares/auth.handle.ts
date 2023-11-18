import { Response, NextFunction } from 'express';
import { jwtHandle } from '../helpers/jwt.handle';
import createError from 'http-errors';
import { RequestExt } from '../interfaces/requestExt.interface';
import moment from 'moment';

export default class AuthHandle {
    static checkJwt = async (
        req: RequestExt,
        res: Response,
        next: NextFunction,
    ): Promise<any> => {
        const jwtByUserToken = req.headers.authorization || null;

        if (!jwtByUserToken) {
            return res.status(403).send({
                message: 'Tu petición no tiene cabecera de autorización',
            });
        }

        const jwtToken: any = jwtByUserToken?.split(' ').pop(); //Solo el token sin el bearer
        try {
            const payload: any = await jwtHandle.verifyToken(jwtToken);
            req.user = payload;
            //https://www.geeksforgeeks.org/express-js-res-locals-property/
            res.locals.payload = payload;
            next();
        } catch (error) {
            next(createError(401, 'SESSION_NO_VALIDA'));
        }
    };
}
