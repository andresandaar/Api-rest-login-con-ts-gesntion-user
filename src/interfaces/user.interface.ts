import { Auth } from "./auth.interfaces";


export interface User extends Auth {
    name: string;
    description: string;
    surname:string
}
