export interface UserLogIn {
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  projects: string[];
}
