import { ITeam } from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

class TeamModelSequelize {
  protected _model = TeamModel;

  // public async create(creationAtributes: ILogin): Promise<UserModel> {
  //   return this._model.create(creationAtributes);
  // }

  findAll = async (): Promise<ITeam[] | null> => this._model.findAll();

  getById = async (id: number): Promise<ITeam | null> => this._model
    .findByPk(id);

  // findByName = async (name: number): Promise<ITeam | null> => this._model
  //   .findOne({ where: { name } });
}

export default TeamModelSequelize;
