import IMatches from '../interfaces/IMatches';
import MatchesModel from '../model/matchesModelSequelize';
import TeamModel from '../model/teamModelSequelize';

export default class MatchesService {
  private notFound = 'Matches Not Found';
  private teamModel = new TeamModel();
  constructor(private matchesModel = new MatchesModel()) { }

  getAll = async () => {
    const userResponse = await this.matchesModel.findAll();
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 200, data: userResponse };
  };

  create = async (body: IMatches) => {
    const { homeTeam, awayTeam } = body;
    const homeTeamId = await this.teamModel.getById(homeTeam);
    const awayTeamId = await this.teamModel.getById(awayTeam);
    if (!homeTeamId || !awayTeamId) {
      return { code: 404, message: 'There is no team with such id!' };
    }
    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    const userResponse = await this.matchesModel.create(body);
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 201, data: userResponse };
  };

  finish = async (id: string) => {
    const userResponse = await this.matchesModel.finish(id);
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 200, data: 'Finished' };
  };

  update = async (id: string, body: IMatches) => {
    const userResponse = await this.matchesModel.update(id, body);
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    return { code: 200, data: userResponse };
  };

  // getById = async (id: number) => {
  //   const userResponse = await this.teamModel.getById(id);
  //   if (!userResponse) {
  //     return { code: 401, message: 'Team Not Found' };
  //   }
  //   return { code: 200, data: userResponse };
  // };
}
