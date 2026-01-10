export interface IUser {
  _id: Types.ObjectId;
  displayName: string;
  name: string;
  email: string;
  password: string;
  emailVerification: Date;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterUserDTO {
  id: string;
  email: string;
}
