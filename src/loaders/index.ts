import loadExpress from './express/express';
import { InitLoadersParams } from './index.types';

const initLoaders = ({ expressApp }: InitLoadersParams) => {
	loadExpress(expressApp);
};

export default initLoaders;
