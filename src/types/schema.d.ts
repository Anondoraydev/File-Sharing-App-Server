interface IUser {
  _id: Types.ObjectId;
  displayName: string;
  name: string;
  email: string;
  password: string;
  emailVarification: Date;
  accessToken: string;
  refreshToken: string;
}
