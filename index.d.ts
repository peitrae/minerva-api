import {
	DecodeOptions,
	Secret,
	SignOptions,
	VerifyOptions,
} from 'jsonwebtoken';

type JwtSign = (
	payload: string | Buffer | object,
	secretOrPrivateKey: Secret,
	options?: SignOptions
) => string;

type JwtVerify = (
	token: string,
	secretOrPrivateKey: Secret,
	options?: VerifyOptions
) => Jwt | JwtPayload | string;

type JwtDecode = (
	token: string,
	options?: DecodeOptions
) => null | JwtPayload | string;

interface JwtObject {
	sign: JwtSign;
	verify: JwtVerify;
	decode: JwtDecode;
}
