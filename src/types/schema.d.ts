export interface IUser {
  _id: Types.ObjectId;
  displayName: string;
  email: string;
  password: string;
  emailVerification: Date;
  refreshToken: string;
}
export interface IFileUser {
  _id: Types.ObjectId;
  originalName?: string;
  storedName: string;
  fileUrl: string;
  size: number;
  mimeType: string;
  uploadedBy: Types.ObjectId;
  senderId?: Types.ObjectId;
  receiverId?: Types.ObjectId;
  uuid: string;
}
export interface RegisterUserDTO {
  id: string;
  email: string;
}
