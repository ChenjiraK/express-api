import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db';

class Badge extends Model {
    public id!: number;
    public badge_label!: string | null;
    public badge_color!: string | null;
};

Badge.init(
  {
    badge_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    badge_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'badges',
  }
);

export default Badge;