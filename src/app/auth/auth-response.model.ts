import { User } from "../user/user.model";

export class AuthResponse {
    userId: number;
    token: string;

    public static fromJson(object: any): AuthResponse{
        return { 
            userId: object.UserId,
            token: object.Token
        } as AuthResponse;    }
}