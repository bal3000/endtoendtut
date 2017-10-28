import { IUserForm } from './iuserform.interface';

export class SignUpForm implements IUserForm {
    public email: string;
    public password: string;
    public passwordVerify: string;
    public passwordFail: boolean;
}