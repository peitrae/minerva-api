import { generateRandomString } from '..';

describe('utils/generateRandomString', () => {
	it('should return string that have default length ', () => {
		const str = generateRandomString();

		expect(typeof str).toEqual('string');
		expect(str.length).toEqual(12);
	});

	it('should return string that have length by its params', () => {
		const str = generateRandomString(64);

		expect(typeof str).toEqual('string');
		expect(str.length).toEqual(64);
	});
});
