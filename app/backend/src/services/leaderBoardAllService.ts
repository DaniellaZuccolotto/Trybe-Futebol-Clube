import LeaderBoardHomeService from './leaderBoardService';
import LeaderBoardAwayService from './leaderBoardAwayService';

export default class LeaderBoardAllService {
  private notFound = 'Leader board Not Found';
  protected leaderHome = new LeaderBoardHomeService();
  protected leaderAway = new LeaderBoardAwayService();

  efficiency = (matchAway: any, matchHome: any) => {
    const totalPoints = matchHome.totalPoints + matchAway.totalPoints;
    const totalGames = matchHome.totalGames + matchAway.totalGames;
    return Number(((totalPoints / (totalGames * 3)) * 100)).toFixed(2);
  };

  resultAll = (matchesAway: any, matchesHome: any) => matchesAway.map((matchAway: any): any => {
    const matchHome = matchesHome
      .find((match: any): any => match.name === matchAway.name);
    return {
      name: matchAway.name,
      totalGames: matchAway.totalGames + matchHome.totalGames,
      goalsFavor: matchAway.goalsFavor + matchHome.goalsFavor,
      goalsOwn: matchAway.goalsOwn + matchHome.goalsOwn,
      goalsBalance: matchAway.goalsBalance + matchHome.goalsBalance,
      totalPoints: matchAway.totalPoints + matchHome.totalPoints,
      totalVictories: matchAway.totalVictories + matchHome.totalVictories,
      totalDraws: matchAway.totalDraws + matchHome.totalDraws,
      totalLosses: matchAway.totalLosses + matchHome.totalLosses,
      efficiency: this.efficiency(matchAway, matchHome),
    };
  });

  resultFinal = (matchesAway: any, matchesHome: any) => {
    const resultTeams = this.resultAll(matchesAway, matchesHome);
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

  getLeaderBoard = async () => {
    const { data: resultAway } = await this.leaderAway.getAllAway();
    const { data: resultHome } = await this.leaderHome.getAll();
    const result = this.resultFinal(resultAway, resultHome);
    return { code: 200, data: result };
  };
}
