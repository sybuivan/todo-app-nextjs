export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IPayloadChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
