import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(50),
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
