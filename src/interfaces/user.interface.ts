import { Auth } from "./auth.interface";
export interface User extends Auth {
    _id?: string;
    name: string;
    surname: string;
    role: roleType;
}
export type roleType = 'Admin' | 'Client';