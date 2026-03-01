import { setResponseStatus } from '@tanstack/react-start/server';

export const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;
export type HTTPStatusCode =
	(typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];

export type SuccessResponse<T> = {
	data: T;
	message?: string;
};

export type ErrorResponse = {
	message: string;
};

type CreateSuccessResponseParams<T> = {
	data: T;
	message?: string;
	statusCode?: HTTPStatusCode;
};
export const createSuccessResponse = <T>({
	data,
	message,
	statusCode = HTTP_STATUS_CODES.OK,
}: CreateSuccessResponseParams<T>): SuccessResponse<T> => {
	setResponseStatus(statusCode);

	return { data, message };
};

type CreateErrorResponseParams = {
	statusCode?: HTTPStatusCode;
	error?: unknown;
};
export const createErrorResponse = ({
	error,
	statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
}: CreateErrorResponseParams): ErrorResponse => {
	setResponseStatus(statusCode);

	let errorMessage = 'An error occurred';
	if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	}

	return { message: errorMessage };
};
