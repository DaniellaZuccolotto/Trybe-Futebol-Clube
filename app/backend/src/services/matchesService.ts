import IMatches from '../interfaces/IMatches';
import MatchesModel from '../model/matchesModelSequelize';

export default class MatchesService {
  private notFound = 'Matches Not Found';
  constructor(private matchesModel = new MatchesModel()) { }

  getAll = async () => {
    const userResponse = await this.matchesModel.findAll();
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 200, data: userResponse };
  };

  create = async (body: IMatches) => {
    const userResponse = await this.matchesModel.create(body);
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 201, data: userResponse };
  };

  update = async (id: string) => {
    const userResponse = await this.matchesModel.update(id);
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 200, data: 'Finished' };
  };

  // getById = async (id: number) => {
  //   const userResponse = await this.teamModel.getById(id);
  //   if (!userResponse) {
  //     return { code: 401, message: 'Team Not Found' };
  //   }
  //   return { code: 200, data: userResponse };
  // };

  // public async login(user: ILogin) {
  //   const foundUser = await this.userModel.findOne(user);
  //   if (!foundUser || foundUser.password !== user.password) {
  //     return { code: 401, message: 'Username or password invalid' };
  //   }
  //   const token = createToken(foundUser.id, user.username);
  //   return { code: 200, data: token };
  // }
}
