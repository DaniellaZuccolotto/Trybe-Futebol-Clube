/* eslint-disable object-property-newline */
// import IMatches from '../interfaces/IMatches';
import LeaderBoardModel from '../model/leaderBoardModelSequelize';
// import TeamModel from '../model/teamModelSequelize';

export default class LeaderBoardService {
  private notFound = 'Leader board Not Found';

  constructor(private leaderBoardModel = new LeaderBoardModel()) { }

  goals = (matches: any) => {
    const goalsFavor = matches
      .reduce((acc: any, { homeTeamGoals }: any): any => acc + homeTeamGoals, 0);
    return goalsFavor;
  };

  goalsAgainst = (matches: any) => {
    const goalsAgainst = matches
      .reduce((acc: any, { awayTeamGoals }: any): any => acc + awayTeamGoals, 0);
    return goalsAgainst;
  };

  points = (matches: any) => {
    const points = matches
      .reduce((acc: any, { homeTeamGoals, awayTeamGoals }: any): any => {
        if (homeTeamGoals > awayTeamGoals) return acc + 3;
        if (homeTeamGoals === awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return points;
  };

  victory = (matches: any) => {
    const victory = matches
      .reduce((acc: any, { homeTeamGoals, awayTeamGoals }: any): any => {
        if (homeTeamGoals > awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return victory;
  };

  draw = (matches: any) => {
    const draw = matches
      .reduce((acc: any, { homeTeamGoals, awayTeamGoals }: any): any => {
        if (homeTeamGoals === awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return draw;
  };

  defeat = (matches: any) => {
    const defeat = matches
      .reduce((acc: any, { homeTeamGoals, awayTeamGoals }: any): any => {
        if (homeTeamGoals < awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return defeat;
  };

  resultAll = (matches: any) => {
    const result = matches.reduce((acc: any, { teamName, matchesHome }: any): any => {
      const totalGames = matchesHome.length;
      const goalsFavor = this.goals(matchesHome);
      const goalsOwn = this.goalsAgainst(matchesHome);
      const goalsBalance = goalsFavor - goalsOwn;
      const totalPoints = this.points(matchesHome);
      const totalVictories = this.victory(matchesHome);
      const totalDraws = this.draw(matchesHome);
      const totalLosses = this.defeat(matchesHome);
      const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
      return [...acc, { name: teamName, totalPoints, totalGames, totalVictories, totalDraws,
        totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency }];
    }, []);
    return result;
  };

  resultFinal = (matches: any) => {
    const resultTeams = this.resultAll(matches);
    const result = resultTeams.sort((a: any, b: any) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;
      return 0;
    });
    return result;
  };

  getAll = async () => {
    const userResponse = await this.leaderBoardModel.findAll();
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    const result = this.resultFinal(userResponse);
    return { code: 200, data: result };
  };
}
