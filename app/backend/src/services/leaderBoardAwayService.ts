import LeaderBoardModel from '../model/leaderBoardModelSequelize';

export default class LeaderBoardService {
  private notFound = 'Leader board Not Found';

  constructor(private leaderBoardModel = new LeaderBoardModel()) { }

  goals = (matches: any) => {
    const goalsFavor = matches
      .reduce((acc: any, { awayTeamGoals }: any): any => acc + awayTeamGoals, 0);
    return goalsFavor;
  };

  goalsAgainst = (matches: any) => {
    const goalsAgainst = matches
      .reduce((acc: any, { homeTeamGoals }: any): any => acc + homeTeamGoals, 0);
    return goalsAgainst;
  };

  points = (matches: any) => {
    const points = matches
      .reduce((acc: any, { homeTeamGoals, awayTeamGoals }: any): any => {
        if (homeTeamGoals < awayTeamGoals) return acc + 3;
        if (homeTeamGoals === awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return points;
  };

  victory = (matches: any) => {
    const victory = matches
      .reduce((acc: any, { homeTeamGoals, awayTeamGoals }: any): any => {
        if (homeTeamGoals < awayTeamGoals) return acc + 1;
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
        if (homeTeamGoals > awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return defeat;
  };

  resultAll = (matches: any) => {
    const result = matches.reduce((acc: any, { teamName, matchesAway }: any): any => {
      const team = {
        name: teamName,
        totalGames: matchesAway.length,
        goalsFavor: this.goals(matchesAway),
        goalsOwn: this.goalsAgainst(matchesAway),
        goalsBalance: (this.goals(matchesAway) - this.goalsAgainst(matchesAway)),
        totalPoints: this.points(matchesAway),
        totalVictories: this.victory(matchesAway),
        totalDraws: this.draw(matchesAway),
        totalLosses: this.defeat(matchesAway),
        efficiency: ((this.points(matchesAway) / (matchesAway.length * 3)) * 100).toFixed(2),
      };

      return [...acc, team];
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

  getAllAway = async () => {
    const userResponse = await this.leaderBoardModel.findAllAway();
    if (!userResponse) {
      return { code: 401, message: this.notFound };
    }
    const result = this.resultFinal(userResponse);
    return { code: 200, data: result };
  };
}
