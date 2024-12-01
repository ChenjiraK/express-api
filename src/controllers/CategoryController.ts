import { Request, Response } from 'express';
import Category from '../models/CategoryModel';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await Category.findAll();
        res.status(200).json({ status: 'success', data: category });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        res.status(200).json({ status: 'success', data: category });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryRequest = req.body;
        let responseData = null;

        if (Array.isArray(categoryRequest)) { // insert array
            responseData = await Category.bulkCreate(categoryRequest);
        } else {
            responseData = await Category.create(req.body)
        }

        res.status(201).json({
            message: 'data inserted successfully',
            data: responseData,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const categoryRequest = req.body;
    
        const category = await Category.findByPk(id);
    
        if (!category) {
          res.status(404).json({ message: 'data not found' });
          return;
        }
    
        // อัปเดตข้อมูลผู้ใช้
        await category.update(categoryRequest);
        res.status(200).json({ message: 'data updated successfully', category });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
    
        const category = await Category.findByPk(id);
    
        if (!category) {
          res.status(404).json({ message: 'data not found' });
          return;
        }
    
        // ลบข้อมูลผู้ใช้
        await category.destroy();
        res.status(200).json({ message: 'data deleted successfully' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
};
