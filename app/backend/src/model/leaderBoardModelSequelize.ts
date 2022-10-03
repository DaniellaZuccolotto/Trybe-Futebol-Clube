// import IMatches from '../interfaces/IMatches';
import MatcheModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';
import { ITeamHome, ITeamAway } from '../interfaces/ITeamMatch';

class MatchesModelSequelize {
  protected _model = TeamModel;

  findAll = async (): Promise<ITeamHome[] | null> => this._model.findAll({
    include: [{ model: MatcheModel, as: 'matchesHome', where: { inProgress: 0 } }],
  }) as unknown as ITeamHome[];

  findAllAway = async (): Promise<ITeamAway[] | null> => this._model.findAll({
    include: [{ model: MatcheModel, as: 'matchesAway', where: { inProgress: 0 } }],
  }) as unknown as ITeamAway[];
}

export default MatchesModelSequelize;
