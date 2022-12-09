import { AppIO } from '@/types/socket.types';
import { Application } from 'express';

export interface InitLoadersParams {
	app: Application;
	io: AppIO;
}
