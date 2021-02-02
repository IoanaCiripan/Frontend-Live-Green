import { UserModel } from "./user.model";

export interface ResponseModel {
    status: string;
    token: string;
    data: UserModel;
}

export interface UserResponseModel {
    status: string;
    data: UserModel[];
}