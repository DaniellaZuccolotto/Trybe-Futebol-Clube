// import IModel from '../interfaces/IModel';
import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/IUser';
import UserModel from '../model/userModelSequelize';
import BcryptService from '../helpers/BcriptService';

export default class LoginService {
  constructor(private userModel = new UserModel()) { }

  login = async (user: ILogin) => {
    const userResponse = await this.userModel.findOne(user);
    if (!userResponse) return { code: 401, message: 'User not found' };
    const passwordHash = BcryptService.compare(userResponse.password, user.password);
    if (!passwordHash) {
      return { code: 401, message: 'Password invalid' };
    }
    const token = createToken(user.email);
    return { code: 200, data: token };
  };

  // public async login(user: ILogin) {
  //   const foundUser = await this.userModel.findOne(user);
  //   if (!foundUser || foundUser.password !== user.password) {
  //     return { code: 401, message: 'Username or password invalid' };
  //   }
  //   const token = createToken(foundUser.id, user.username);
  //   return { code: 200, data: token };
  // }
}
