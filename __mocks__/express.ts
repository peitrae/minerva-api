import { Application } from 'express';

export const mockRes = {
	status: jest.fn().mockReturnThis(),
	end: jest.fn(),
};

const mockReq = {};

export const mockGet = jest.fn((_: string, cb: Function) => {
	cb(mockReq, mockRes);
});

export const mockApp = {
	get: mockGet,
	use: jest.fn(),
} as unknown as Application;
