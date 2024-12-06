//* Mock Sequelize for test api data
import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { login, register, getProfile } from '../controllers/AuthUserController';
import User from '../models/UserModel';
import { hashPassword } from '../utility/Auth';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MkBlbWFpbC5jb20iLCJpYXQiOjE3MzMxMzM3OTh9.ZzBEFVRMcOz9PQ2hFtBggHm3JPzDw0KQ7iblbZqmZ_o'
vi.mock('../models/User', async () => {
    const originalModule = await vi.importActual('../models/User');
    return {
      ...originalModule,
      User: {
        findOne: vi.fn(),
      },
    };
});

vi.mock('../utility/Auth', () => ({
    comparePassword: vi.fn(),
    checkUserExists: vi.fn(),
}));

vi.mock('jsonwebtoken', async () => {
    const actual = await vi.importActual('jsonwebtoken');
    return {
      ...actual,
      sign: vi.fn(() => mockToken),
    };
});

const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
} as unknown as Response;

const mockUser = {
    id: 1,
    username: 'testUser',
    password: 'hashedPassword',
    email: 'test@example.com',
};
describe('login', async () => {
    const authUtil = await import('../utility/Auth');
    it('should return status 200 if login successfully', async () => {
        const req = { body: { email: 'test@example.com',password: 'testPassword' }} as Request;
        const findOneSpy = vi.spyOn(User, 'findOne').mockResolvedValue(mockUser as any); // get data success
        const comparePasswordSpy = vi.spyOn(authUtil, 'comparePassword').mockResolvedValue(true);
        const signSpy = vi.spyOn(jwt, 'sign').mockReturnValue(mockToken as any);
    
        // Act
        await login(req, res);
    
        // Assert
        expect(findOneSpy).toHaveBeenCalledWith({
            where: { email: 'test@example.com' },
            raw: true,
        });
        expect(comparePasswordSpy).toHaveBeenCalledWith(req.body.password, mockUser.password);
        expect(signSpy).toHaveBeenCalledWith(
            { id: 1, email: 'test@example.com' },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            token: mockToken,
        });
    });

    it('should return status 404 if user not found', async () => {
        const req = { body: { email: 'nonExistingUser@email.com',password: 'testPassword' }} as Request;
        const findOneSpy = vi.spyOn(User, 'findOne').mockResolvedValue(null); // get data is null

        // Act
        await login(req, res);
    
        // Assert
        expect(findOneSpy).toHaveBeenCalledWith({
            where: { email: req.body.email },
            raw: true,
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          message: 'username or password incorrect',
        });
    
        // Cleanup
        findOneSpy.mockRestore();
    });

    it('should return status 401 if password is incorrect', async () => {
        const req = { body: { email: 'test@example.com', password: 'wrongPassword' } } as any;
    
        const findOneSpy = vi.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);
        const comparePasswordSpy = vi.spyOn(authUtil, 'comparePassword').mockResolvedValue(false); // return password not match
    
        // Act
        await login(req, res);
    
        // Assert
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { email: req.body.email },
          raw: true,
        });
        expect(comparePasswordSpy).toHaveBeenCalledWith(req.body.password, mockUser.password);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
          message: 'password incorrect',
        });
    
        // Cleanup
        findOneSpy.mockRestore();
        comparePasswordSpy.mockRestore();
    });

    it('should return status 500 when server errors', async () => {
        const req = { body: { username: 'testUser', password: 'testPassword' } } as any;    
        const findOneSpy = vi.spyOn(User, 'findOne').mockRejectedValue(new Error('Database error'));
    
        // Act
        await login(req, res);
    
        // Assert
        expect(findOneSpy).toHaveBeenCalledWith({
            where: { username: 'testUser' },
            raw: true,
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: 'Database error',
        });
    
        // Cleanup
        findOneSpy.mockRestore();
    });
})

describe('register', async () => {
    const mockRequestData = {
        username: 'newUser',
        password: 'hashedPassword',
        email: 'newuser@example.com',
    };
    const mockResponseData = {
        id: 1,
        ...mockRequestData,
    };
    const req = {
        body: {
          username: 'newUser',
          password: 'newPassword',
          email: 'newuser@example.com',
        },
    } as Request;
    const authUtil = await import('../utility/Auth');

    it('should return status 201 if register successfully', async () => {
        const getRequestParamsSpy = vi.spyOn(User, 'getRequestParams').mockResolvedValue(mockRequestData as any); //get params before send api
        const checkUserExistsSpy = vi.spyOn(authUtil, 'checkUserExists').mockResolvedValue(null); //ไม่มีค่าซ้ำ
        const createSpy = vi.spyOn(User, 'create').mockResolvedValue(mockResponseData as any); //mock response from api

        await register(req, res);

        expect(getRequestParamsSpy).toHaveBeenCalledWith(req.body);
        expect(checkUserExistsSpy).toHaveBeenCalledWith(null, req.body.username, req.body.email);
        expect(createSpy).toHaveBeenCalledWith(mockRequestData);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'register successfully',
            data: mockResponseData,
        });
    })

    it('should return status 409 if email or username already exists', async () => {
        const getRequestParamsSpy = vi.spyOn(User, 'getRequestParams').mockResolvedValue(mockRequestData as any);
        const checkUserExistsSpy = vi.spyOn(authUtil, 'checkUserExists').mockResolvedValue('this username already exists'); //return text from checkUserExists

        await register(req, res);

        expect(getRequestParamsSpy).toHaveBeenCalledWith(req.body);
        expect(checkUserExistsSpy).toHaveBeenCalledWith(null, req.body.username, req.body.email);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'this username already exists',
        });

        getRequestParamsSpy.mockRestore();
        checkUserExistsSpy.mockRestore();
    })
})