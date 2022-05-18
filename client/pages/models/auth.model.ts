export interface LoginRequestModel{
  "email": string,
  "password": string,
}

export interface ConsolidatedLoginDetail {
    msg:  string;
    data: LoginDetail;
}

export interface LoginDetail {
    data: {
        userId: number;
        email:  string;
        token:  string;
    }
}

export interface RegisterRequestModel extends LoginRequestModel {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string
}

export interface ConsolidatedRegisterDetail {
    msg:  string;
    data: RegisterDetail;
}

export interface RegisterDetail {
}
