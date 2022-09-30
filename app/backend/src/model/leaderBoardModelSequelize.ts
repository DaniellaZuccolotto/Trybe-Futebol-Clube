// import IMatches from '../interfaces/IMatches';
import MatcheModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';

class MatchesModelSequelize {
  protected _model = TeamModel;

  findAll = async (): Promise<TeamModel[] | null> => this._model.findAll({
    include: [{ model: MatcheModel, as: 'matchesHome', where: { inProgress: 0 } }],
  });

  findAllAway = async (): Promise<TeamModel[] | null> => this._model.findAll({
    include: [{ model: MatcheModel, as: 'matchesAway', where: { inProgress: 0 } }],
  });
}

export default MatchesModelSequelize;
