/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VerificationTokenService {
    /**
     * @param fields
     * @param filters
     * @param q
     * @param pagination
     * @param sort
     * @param populate
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static verificationTokenGetVerificationTokens(
        fields?: Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        filters?: Record<string, any>,
        q?: string,
        pagination?: ({
            withCount?: boolean;
        } & ({
            page: number;
            pageSize: number;
        } | {
            start: number;
            limit: number;
        })),
        sort?: ('userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        populate?: (string | Array<string>),
        status?: 'draft' | 'published',
    ): CancelablePromise<{
        data: Array<{
            documentId: string;
            id: number;
            userEmail: string;
            token: string;
            expiresAt: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/verification-tokens',
            query: {
                'fields': fields,
                'filters': filters,
                '_q': q,
                'pagination': pagination,
                'sort': sort,
                'populate': populate,
                'status': status,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param fields
     * @param populate
     * @param status
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static verificationTokenPostVerificationTokens(
        fields?: Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | Array<string>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                userEmail: string;
                token: string;
                expiresAt: string;
                publishedAt: string;
            };
        },
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            userEmail: string;
            token: string;
            expiresAt: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/verification-tokens',
            query: {
                'fields': fields,
                'populate': populate,
                'status': status,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param id
     * @param fields
     * @param populate
     * @param filters
     * @param sort
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static verificationTokenGetVerificationTokensById(
        id: string,
        fields?: Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | Array<string>),
        filters?: Record<string, any>,
        sort?: ('userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        status?: 'draft' | 'published',
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            userEmail: string;
            token: string;
            expiresAt: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/verification-tokens/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'filters': filters,
                'sort': sort,
                'status': status,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param id
     * @param fields
     * @param populate
     * @param status
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static verificationTokenPutVerificationTokensById(
        id: string,
        fields?: Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | Array<string>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                userEmail?: string;
                token?: string;
                expiresAt?: string;
                publishedAt?: string;
            };
        },
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            userEmail: string;
            token: string;
            expiresAt: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/verification-tokens/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'status': status,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param id
     * @param fields
     * @param populate
     * @param filters
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static verificationTokenDeleteVerificationTokensById(
        id: string,
        fields?: Array<'userEmail' | 'token' | 'expiresAt' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | Array<string>),
        filters?: Record<string, any>,
        status?: 'draft' | 'published',
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            userEmail: string;
            token: string;
            expiresAt: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/verification-tokens/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'filters': filters,
                'status': status,
            },
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
