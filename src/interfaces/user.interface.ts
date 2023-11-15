import { Auth } from "./auth.interfaces";


export interface User extends Auth {
    _id?:string
    name: string;
    surname:string
}
