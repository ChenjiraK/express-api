import { Request, Response } from 'express';
import User from '../models/UserModel';

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json({ status: 'success', data: users });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        res.status(200).json({ status: 'success', data: user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        let responseData = null;
        const requestData = await User.getRequestParams(req.body);
        if (Array.isArray(requestData)) { // insert array
            responseData = await User.bulkCreate(requestData);
        } else {
            responseData = await User.create(requestData)
        }

        res.status(201).json({
            message: 'data inserted successfully',
            data: responseData,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const requestData = await User.getRequestParams(req.body);;
    
        const user = await User.findByPk(id);
    
        if (!user) {
          res.status(404).json({ message: 'data not found' });
          return;
        }
    
        // อัปเดตข้อมูลผู้ใช้
        await user.update(requestData);
        res.status(200).json({ message: 'data updated successfully', requestData });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
    
        const user = await User.findByPk(id);
    
        if (!user) {
          res.status(404).json({ message: 'data not found' });
          return;
        }
    
        // ลบข้อมูลผู้ใช้
        await user.destroy();
        res.status(200).json({ message: 'data deleted successfully' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
};
