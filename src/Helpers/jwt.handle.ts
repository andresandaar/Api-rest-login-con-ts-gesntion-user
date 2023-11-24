import {sign, verify } from "jsonwebtoken"
import "dotenv/config";

export class jwtHandle {
    private static JWT_SECRET = process.env.JWT_PRIVATE_KEY as string;
    //Generamos un nuevo token de autorizacion
    static generateToken = async (payload: object): Promise<string> => {
        const jwtToken = sign(payload, this.JWT_SECRET, {
            expiresIn: '2h',
        });
        return jwtToken;
    };

    //Verificamos el token
    static verifyToken = async (token: string) => {
        const payload:any = verify(token, this.JWT_SECRET);
        return payload;
    };
}