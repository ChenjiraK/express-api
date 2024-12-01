import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import User from '../models/UserModel';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); // สร้าง Salt
    return await bcrypt.hash(password, salt); // Hash รหัสผ่าน
};
  
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash); // ตรวจสอบ Password กับ Hash
};

//* check exist by username or email
export const checkUserExists = async (id: string|null, username: string, email: string | null): Promise<string | null> => {
    try {
        const existUsername = await User.findOne({
            where: {
                [Op.or]: [
                  { username: username },
                ],
                id: { [Op.ne]: id }, // Exclude current user
            },
        });
        const existEmail = await User.findOne({
            where: {
                [Op.or]: [
                  { email: email },
                ],
                id: { [Op.ne]: id }, // Exclude current user
            },
        });

        if (existUsername) {
            return 'this username already exists';
        }
        if(existEmail) {
            return 'this email already exists';
        }
        return null;  

    } catch (error) {
      console.error('Error checking user existence:', error);
      throw new Error('Failed to check user existence');
    }
}; 