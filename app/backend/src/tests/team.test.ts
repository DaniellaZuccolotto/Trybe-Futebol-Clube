import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(UserModel, "findOne")
  //     .resolves({
  //       username: 'Admin',
  //       role: 'admin',
  //       email: 'admin@admin.com',
  //       password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  //       id: 1
  //     } as UserModel);
  // });

  // after(()=>{
  //   (UserModel.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Deve retornar os times com sucesso', async () => {
    const result = await chai.request(app).get('/teams')
    expect(result.status).to.be.equal(200);
    // expect(result.body).to.have.property('token');
  });
});