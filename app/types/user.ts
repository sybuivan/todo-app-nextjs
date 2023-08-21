export interface IPayloadUser {
  username: string;
  firstName: string;
  lastName: string;
}

export interface IPayloadChangePassword {
  oldPassword: string;
  newPassword: string;
}
