export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadRegiter extends IPayloadLogin {
  username: string;
  firstName: string;
  lastName: string;
}

export interface IPayloadResetPassword {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
