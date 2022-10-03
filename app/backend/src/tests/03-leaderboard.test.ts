import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as leaderMock from './mocks/mocks';
import { app } from '../app';
import LeaderModel from '../model/leaderBoardModelSequelize';
// import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
describe('Rota /leaderBoard', () => {
  describe('Rota Get /leaderboard/home sucesso', () => {
    // before(async () => {
    //   sinon
    //     .stub(LeaderModel.prototype, "findAll")
    //     .resolves(leaderMock.arrayTeamHome);
    // });
    // after(() => {
    //   (LeaderModel.prototype.findAll as sinon.SinonStub).restore();
    // });
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard/home');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(leaderMock.arrayBoardHome);
    });
  })
  describe('Rota Get /leaderboard/away ', () => {
    // before(async () => {
    //   sinon
    //     .stub(LeaderModel.prototype, "findAllAway")
    //     .resolves(leaderMock.arrayTeamAway);
    // });
    // after(() => {
    //   (LeaderModel.prototype.findAllAway as sinon.SinonStub).restore();
    // });
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard/away');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(leaderMock.arrayBoardAway);
    });
  })
  describe('Rota Get /leaderboard ', () => {
    // before(async () => {
    //   sinon
    //     .stub(LeaderModel.prototype, "findAll")
    //     .resolves(leaderMock.arrayTeamHome);
    //   sinon
    //     .stub(LeaderModel.prototype, "findAllAway")
    //     .resolves(leaderMock.arrayTeamAway);
    // });
    // after(() => {
    //   (LeaderModel.prototype.findAll as sinon.SinonStub).restore();
    //   (LeaderModel.prototype.findAllAway as sinon.SinonStub).restore();
    // });
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(leaderMock.arrayBoard);
    });
  })
});