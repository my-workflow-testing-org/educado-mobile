/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VerifyEmailService {
    /**
     * @returns void
     * @throws ApiError
     */
    public static verifyEmailPostVerifyEmail(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/verify-email',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
}
