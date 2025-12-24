import { Types } from "mongoose";
export interface IUser {
  _id: Types.ObjectId;
  displayName: string;
  name: string;
  email: string;
  password: string;
}
