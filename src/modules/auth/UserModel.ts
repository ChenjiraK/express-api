import { DataTypes, Model } from 'sequelize';
import moment from 'moment';
import sequelize from '../../database/db';
import { IUserParams } from './AuthInterface';
import { hashPassword } from '../../utility/Auth';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public first_name!: string | null;
  public last_name!: string | null;
  public email!: string | null;
  public phone_number!: string | null;
  public birth_date!: string | null;

  static async getRequestParams(data: IUserParams) {
    const encodePassword = data.password
      ? await hashPassword(data.password)
      : null;
    return {
      username: data.username ?? null,
      password: encodePassword,
      first_name: data.first_name ?? null,
      last_name: data.last_name ?? null,
      email: data.email ? data.email.toLocaleLowerCase() : null,
      phone_number: data.phone_number ?? null,
      birth_date: data.birth_date
        ? moment(data.birth_date).local().format('YYYY-MM-DD')
        : null,
    };
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'password',
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'users',
  }
);

export default User;
