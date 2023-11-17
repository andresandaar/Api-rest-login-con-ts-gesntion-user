import { hash, compare } from "bcryptjs"
export class BcryptHandle {
  
  //ENcriptamos la contraseña
  static encrypt=async (passwordPlane:string):Promise<string>=> {
    const passwordHash=await hash(passwordPlane,8)
    return passwordHash;
  }
//Verificamos si la contraseña es correcta
  static verifield=async ( passwordPlane:string, passwordEncrypt:string ):Promise<boolean>=> {
    const passwordCompare=await compare(passwordPlane,passwordEncrypt);
    return  passwordCompare;
  }
  
}