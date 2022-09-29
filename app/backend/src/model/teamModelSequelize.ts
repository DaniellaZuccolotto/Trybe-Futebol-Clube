import { ITeam } from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

class TeamModelSequelize {
  protected _model = TeamModel;

  // public async create(creationAtributes: ILogin): Promise<UserModel> {
  //   return this._model.create(creationAtributes);
  // }

  findAll = async (): Promise<ITeam[] | null> => this._model.findAll();

  // findOne = async (email: string): Promise<IUser | null> => this._model
  //   .findOne({ where: { email } });
}

export default TeamModelSequelize;
