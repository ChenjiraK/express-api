import { DataTypes, Model } from 'sequelize';
import moment from 'moment';
import sequelize from '../database/db';
import { IUserParams } from '../Interface/UserInterface';
import { hashPassword } from '../utility/Auth';

class User extends Model {
    public id!: number;
    public username!: string | null;
    public password!: string | null;
    public first_name!: string | null;
    public last_name!: string | null;
    public email!: string | null;
    public phone_number!: string | null;
    public birth_date!: string | null;

    static async getRequestParams(data: IUserParams) {
        const encodePassword = await hashPassword(data.password);
        return {
            username: data.username,
            password: encodePassword,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.phone_number,
            birth_date: moment(data.birth_date).local().format('YYYY-MM-DD'),
        }
    }
};

User.init(
  {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'users',
  }
);

export default User;