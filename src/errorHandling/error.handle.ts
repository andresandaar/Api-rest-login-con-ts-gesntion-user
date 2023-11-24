import { Request, Response, NextFunction } from 'express';

export default class ErrorHandler {
  static handleHttp(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    /* console.log("andres",err) */

    //Errores token
    if (err.name && err.name == 'TokenExpiredError') {
      err.statusCode = 401;
      err.message = 'El token ha expirado';
    }
    if (err.name && err.name == 'JsonWebTokenError') {
      err.statusCode = 401;
      err.message = 'Usuario no autorizado';
    }

    if (err.name && err.name == 'NotBeforeError') {
      err.statusCode = 401;
      err.message = 'Jwt no activo';
    }



    if (err.code == 'ER_DUP_ENTRY') {
      /* Clave primaria duplicada al enviar la solicitud */
      err.message = 'El registro ya existe';
      err.statusCode = 400;
    }

    if (err.code == 'ER_PARSE_ERROR') {
      err.statusCode = 400;
    }

    if (err.code == 'ER_BAD_FIELD_ERROR') {
      /* Parametros mal escritos al enviar la solicitud */
      err.statusCode = 400;
      err.message = 'No existe parametro en la BD' + ' ' + err.sqlMessage;
    }

    if (err.code == 'ER_WRONG_ARGUMENTS') {
      err.statusCode = 500;
    }

    if (err.code == 'ERR_INVALID_ARG_TYPE') {
      err.statusCode = 500;
    }

    if (err.code == 'EADDRINUSE') {
      err.statusCode = 500;
    }

    if (err.code == 'ER_NO_REFERENCED_ROW_2') {
      err.statusCode = 400;
      err.message =
        'No se pudo realizar la operación. Revise la información enviada';
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
  }
}
