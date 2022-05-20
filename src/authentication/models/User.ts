import LoginData from './LoginData';
import SignupData from './SignupData';
import User from '../../users/models/User';
import ChangePasswordRequest from '../../users/components/ChangePasswordRequest';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  balance: number;
  role: string;
}

export type UserContextType = {
  user: IUser | null;
  login: (loginData: LoginData) => Promise<any>;
  signup: (signupData: SignupData) => Promise<any>;
  saveUser: (user: User) => Promise<any>;
  changePassword: (request: ChangePasswordRequest) => Promise<any>;
  addBalance: (amount: any) => void;
  logout: () => void;
};
