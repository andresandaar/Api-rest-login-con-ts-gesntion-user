
import { NextFunction, Request, Response, json } from "express";
 import { UserServices } from "../services/user.service";
/*";
import { ValidateFields } from "../utils/validate.fields";
import { RequestExt } from "../interfaces/requestExt.interface"; */
//import createError from "http-errors";


export default class UserController {

  private static userServices = UserServices;

  // Obtiene un elemento específico
  static getItem = async (req: Request, res: Response, next: NextFunction) => {
    res.json('hola')
  /*   const {id}=req.params
   try {
      const resposeItem = await this.itemServices.getCar(id);
      res.send(resposeItem);
    } catch (error) {
      next(error);
    } */
  };

  // Obtiene una lista de elementos
  /* static getItems = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const resposeItem:any[] = await this.itemServices.getCars()
      res.send({data:resposeItem,user:req?.user});
    } catch (error) {
      next(error);
    }
  }; */

  // Actualiza un elemento
  static updateItem = async (req: Request, res: Response, next: NextFunction) => {
  /*   const {id}=req.params;
    // Verificar que todos los campos estén presentes y no sean nulos ni vacíos
    const requiredFields = ['color', 'gas', 'year', 'description', 'price'];
    ValidateFields.validateField(requiredFields,req,res);

   try {
      const respose= await this.itemServices.updateCar(id,req.body);
      res.json({'message': 'Usuario actaulizado con exito',respose});
    } catch (error) {
      next(error);
    } */

  };

  // Agrega un nuevo elemento
  static addItem = async ({ body }: Request, res: Response, next: NextFunction) => {
   /*  try {
      const resposeItem = await this.itemServices.insertCar(body);
      res.send(resposeItem);
    } catch (error) {
      next(error);
      //next(createError(401, 'Please login to view this page.'))
    } */
  };

  // Elimina un elemento
  static deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  /*   const {id}=req.params
   try {
      const response = await this.itemServices.deleteCar(id);
       if (!response) return res.status(400).json({'message': 'El usuario no existe en la DB'});
      res.json({'message': 'Usuario eliminado con exito',response});
    } catch (error) {
      next(error);
    } */
  };
}