import { DataTypes, Model } from 'sequelize';
import moment from 'moment';
import sequelize from '../../database/db';
import { IProfileParams } from './AuthInterface';
import { hashPassword } from '../../utility/Auth';
import { cleanObjectEmptyStr } from '../../utility/Util';

class User extends Model {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string | null;
  image_url!: string | null;
  birth_date!: string | Date | null;
  gender!: string | null;
  phone!: string | null;
  is_accept_terms!: boolean;
  is_accept_privacy!: boolean;
  is_accept_marketing!: boolean;

  static async getUserParams(data: any) {
    const encodePassword = data.password
      ? await hashPassword(data.password)
      : null;
    let param = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email.toLocaleLowerCase(),
      password: encodePassword,
      phone: data.phone ?? null,
      image_url: data.image_url ?? null,
      gender: data.gender ?? null,
      is_accept_terms: data.is_accept_terms ?? false,
      is_accept_privacy: data.is_accept_privacy ?? false,
      is_accept_marketing: data.is_accept_marketing ?? false,
      birth_date: data.birth_date
        ? moment(data.birth_date).local().format('YYYY-MM-DD')
        : null,
    } as IProfileParams;
    return cleanObjectEmptyStr(param);
  }

  static registerValidate(data: any){
    if(data.firstname) {
      return 'firstname is require field'
    }
    if(data.lastname) {
      return 'lastname is require field'
    }
    if(data.email) {
      return 'email is require field'
    }
    if(data.password) {
      return 'password is require field'
    }
    return null;
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
