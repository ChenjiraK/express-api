import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { comparePassword, checkUserExists } from '../../utility/Auth';
import { isEmpty } from '../../utility/Util';
import User from './UserModel';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      raw: true, //access to dataValues object of users
    });
    if (!user) {
      res.status(404).json({ message: 'email or password incorrect' });
      return;
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'password incorrect' });
      return;
    }

    // สร้าง Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '5h' } //expiresIn?: string | number;
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    let responseData = null;
    const requestData = await User.getRequestParams(req.body);
    const existData = await checkUserExists(
      null,
      requestData.username,
      requestData.email
    );
    if (existData) {
      res.status(409).json({
        message: existData,
      });
      return;
    }
    responseData = await User.create(requestData);

    res.status(201).json({
      message: 'register successfully',
      data: responseData,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id ?? null; // ดึง User ID จาก Token
    if (isEmpty(userId)) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    const user = await User.findByPk(userId, {
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'birth_date',
      ],
    });

    if (isEmpty(user)) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id ?? null; // ดึง User ID จาก Token
    const requestData = await User.getRequestParams(req.body);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'profile not found' });
      return;
    }
    // อัปเดตข้อมูลผู้ใช้
    await user.update(requestData);
    res
      .status(200)
      .json({ message: 'profile updated successfully', data: requestData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
