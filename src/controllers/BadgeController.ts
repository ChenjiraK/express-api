import { Request, Response } from 'express';
import Badge from '../models/BadgeModel';

export const getAllBadges = async (req: Request, res: Response): Promise<void> => {
    try {
        const badges = await Badge.findAll();
        res.status(200).json({ status: 'success', data: badges });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getBadge = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const badge = await Badge.findByPk(id);
        res.status(200).json({ status: 'success', data: badge });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createBadge = async (req: Request, res: Response): Promise<void> => {
    try {
        const badgeRequest = req.body;
        let responseData = null;

        if (Array.isArray(badgeRequest)) { // insert array
            responseData = await Badge.bulkCreate(badgeRequest);
        } else {
            responseData = await Badge.create(req.body)
        }

        res.status(201).json({
            message: 'data inserted successfully',
            data: responseData,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBadge = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const badgeRequest = req.body;
    
        const badge = await Badge.findByPk(id);
    
        if (!badge) {
          res.status(404).json({ message: 'data not found' });
          return;
        }
    
        // อัปเดตข้อมูลผู้ใช้
        await badge.update(badgeRequest);
        res.status(200).json({ message: 'data updated successfully', badge });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
};

export const deleteBadge = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
    
        const badge = await Badge.findByPk(id);
    
        if (!badge) {
          res.status(404).json({ message: 'data not found' });
          return;
        }
    
        // ลบข้อมูลผู้ใช้
        await badge.destroy();
        res.status(200).json({ message: 'data deleted successfully' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
};
