import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db';

class Category extends Model {
    public id!: number;
    public name!: string | null;
    public min_price!: number | null;
};

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_price: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'categories',
  }
);

export default Category;