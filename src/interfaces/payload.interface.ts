import { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
    id: string,
    email: string,
    role: string,
    iat: number,
    exp: number,
}
