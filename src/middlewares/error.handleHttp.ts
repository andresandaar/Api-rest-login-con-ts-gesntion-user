

import { Request, Response, NextFunction } from "express"

export default class ErrorHandler {
  
  static handleHttp(err:any, req: Request, res: Response,  next: NextFunction): void {
     if(err.code=='ER_DUP_ENTRY'){/* Clave primaria duplicada al enviar la solicitud */
    err.message="El registro ya existe";
    err.statusCode=400;
  }
 
  if(err.code=='ER_PARSE_ERROR'){
    err.statusCode=400;
  }
           
 if(err.code=='ER_BAD_FIELD_ERROR'){/* Parametros mal escritos al enviar la solicitud */
    err.statusCode=400;
    err.message="No existe parametro en la BD"+" "+err.sqlMessage; 
  }
             
  if(err.code=='ER_WRONG_ARGUMENTS'){
    err.statusCode=500;
  }
                
  if(err.code=='ERR_INVALID_ARG_TYPE'){
    err.statusCode=500;
  }
                 
  if(err.code=='EADDRINUSE'){
    err.statusCode=500;
  }

  if(err.code == 'ER_NO_REFERENCED_ROW_2'){
    err.statusCode = 400;
    err.message = "No se pudo realizar la operación. Revise la información enviada" 
  }

  const statusCode = err.statusCode || 500;
  console.error(err)
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
  }

}

