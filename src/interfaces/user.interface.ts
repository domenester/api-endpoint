export interface IUser {
  id: string;
  name: string;
  email: string;
  lastName: string;
  fullName: string;
  username: string;
  department: string;
  extension: string;
  profile: string;
  profilePhoto: string;
}

export interface IUserNew {
  name: string;
  racf: string;
  extension: string;
  email: string;
  department: string;
  profile: string;
}
