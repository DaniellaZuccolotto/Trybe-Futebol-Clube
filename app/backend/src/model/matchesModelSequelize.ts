// import IMatches from '../interfaces/IMatches';
import IMatches from '../interfaces/IMatches';
import MatcheModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';

class MatchesModelSequelize {
  protected _model = MatcheModel;

  create = async (body: IMatches) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const newGame = {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    };
    const result = await this._model.create(newGame);
    const { id } = result;
    return { id, ...newGame };
  };

  findAll = async (): Promise<MatcheModel[] | null> => this._model.findAll({
    include: [
      { model: TeamModel, as: 'teamHome' },
      { model: TeamModel, as: 'teamAway' }],
  });

  finish = async (id: string) => {
    const result = await this._model.update({ inProgress: false }, { where: { id } });
    return result;
  };

  update = async (id: string, body: IMatches) => {
    const { homeTeamGoals, awayTeamGoals } = body;
    const newGame = {
      homeTeamGoals,
      awayTeamGoals,
    };
    const result = await this._model.update(newGame, { where: { id } });
    return result;
  };

  // getById = async (id: number): Promise<ITeam | null> => this._model
  //   .findByPk(id);
}

export default MatchesModelSequelize;
