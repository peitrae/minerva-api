export interface Errors {
	status: number;
	name: string;
	message: string;
}

export interface ErrorConstructorParams {
	status?: Errors['status'];
	name?: Errors['name'];
	message: Errors['message'];
}
