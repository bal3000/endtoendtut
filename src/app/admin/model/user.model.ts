import { IUser } from './iuser.interface';

export class User implements IUser {
    email: string;
    displayName: string;

    constructor(private userEmail: string, private userName: string) {
        this.email = userEmail;
        this.displayName = userName;
    }
}