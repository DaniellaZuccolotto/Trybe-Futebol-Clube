// import { Model, ModelStatic } from 'sequelize';
// import IModel from '../interfaces/IModel';
import { IUser, ILogin } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';

abstract class SequelizeModelUser {
  protected _model = UserModel;

  // public async create(creationAtributes: ILogin): Promise<UserModel> {
  //   return this._model.create(creationAtributes);
  // }

  findOne = async (user: ILogin): Promise<IUser | null> => this._model
    .findOne({ where: { email: user.email } });
}

export default SequelizeModelUser;
