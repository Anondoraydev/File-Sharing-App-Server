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
  fileName: string;
  path: string;
  sender: string;
  receiver: string;
  size: number;
  whoUploaded: { type: Schema.Types.ObjectId; ref: "User" };
  uuid: string;
  originalName?: string;
  storedName: string;
  fileUrl: string;
  size: number;
  mimeType: string;
  uploadedBy: Types.ObjectId;
  senderId?: Types.ObjectId;
  receiverId?: Types.ObjectId;
}
export interface RegisterUserDTO {
  id: string;
  email: string;
}
