export class AuthRequest {
    email: string;
    password: string;

    public static toJson(object: AuthRequest): any {
        return {
            Email: object.email,
            Password: object.password
        };
    }
}
