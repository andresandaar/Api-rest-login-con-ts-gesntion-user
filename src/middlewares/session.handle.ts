
import { Request, Response, NextFunction } from "express"
import { jwtHandle } from "../helpers/jwt.handle";
import createError from "http-errors";
import { RequestExt } from "../interfaces/requestExt.interface";


export default class sessionHandler {
  static checkJwt =async (req: RequestExt, res: Response,  next: NextFunction): Promise<any>=> {
    const jwtByUserToken =req.headers.authorization || null;
    const jwtToken:any =jwtByUserToken?.split(' ').pop();//Solo el token sin el bearer
    try {
      const payload=await jwtHandle.verifyToken(jwtToken)
      req.user=payload;
         res.locals.payload = payload;
      next();
    } catch (error) {
      next(createError(400, 'SESSION_NO_VALIDA'));   
    }
  }

}