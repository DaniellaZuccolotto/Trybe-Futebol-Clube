// import IMatches from '../interfaces/IMatches';
import MatcheModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';

class MatchesModelSequelize {
  protected _model = MatcheModel;

  // public async create(creationAtributes: ILogin): Promise<UserModel> {
  //   return this._model.create(creationAtributes);
  // }

  findAll = async (): Promise<MatcheModel[] | null> => this._model.findAll({
    include: [
      { model: TeamModel, as: 'teamHome' },
      { model: TeamModel, as: 'teamAway' }],
  });

  // getById = async (id: number): Promise<ITeam | null> => this._model
  //   .findByPk(id);
}

export default MatchesModelSequelize;
