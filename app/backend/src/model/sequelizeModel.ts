import { IUser } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';

class SequelizeModelUser {
  protected _model = UserModel;

  // public async create(creationAtributes: string): Promise<UserModel> {
  //   return this._model.create(creationAtributes);
  // }

  findOne = async (email: string): Promise<IUser | null> => this._model
    .findOne({ where: { email } });
}

export default SequelizeModelUser;
