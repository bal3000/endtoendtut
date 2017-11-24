import { IUser } from './iuser.interface';

// fill out with firebase data
export class AuthUser implements IUser {
    email: string;
    displayName: string;
    uid: string;
    photoUrl: string;
}