import { IUserForm } from './iuserform.interface';

export class LoginForm implements IUserForm {
    public email: string;
    public password: string;
}