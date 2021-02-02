export interface ResetPasswordModel {
    email: string;
    newPassword: string;
}

export class UpdatePasswordModel {
    oldPassword: string;
    newPassword: string;
}