import TeamModel from '../model/teamModelSequelize';

export default class LoginService {
  constructor(private teamModel = new TeamModel()) { }

  getAll = async () => {
    const userResponse = await this.teamModel.findAll();
    if (!userResponse) {
      return { code: 401, message: 'Username or password invalid' };
    }
    return { code: 200, data: userResponse };
  };

  // findUser = async (email: string) => this.userModel.findOne(email);

  // public async login(user: ILogin) {
  //   const foundUser = await this.userModel.findOne(user);
  //   if (!foundUser || foundUser.password !== user.password) {
  //     return { code: 401, message: 'Username or password invalid' };
  //   }
  //   const token = createToken(foundUser.id, user.username);
  //   return { code: 200, data: token };
  // }
}
