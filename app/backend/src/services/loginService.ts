// import IModel from '../interfaces/IModel';
import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/IUser';
import UserModel from '../model/userModelSequelize';
import BcryptService from '../helpers/BcriptService';

export default class LoginService {
  constructor(private userModel = new UserModel()) { }

  login = async (user: ILogin) => {
    const userResponse = await this.userModel.findOne(user.email);
    if (!userResponse) return { code: 401, message: 'Incorrect email or password' };
    const passwordHash = BcryptService.compare(userResponse.password, user.password);
    if (!passwordHash) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    const token = createToken(user.email);
    return { code: 200, data: token };
  };

  findUser = async (email: string) => this.userModel.findOne(email);

  // public async login(user: ILogin) {
  //   const foundUser = await this.userModel.findOne(user);
  //   if (!foundUser || foundUser.password !== user.password) {
  //     return { code: 401, message: 'Username or password invalid' };
  //   }
  //   const token = createToken(foundUser.id, user.username);
  //   return { code: 200, data: token };
  // }
}
