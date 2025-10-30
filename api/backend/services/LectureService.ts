/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LectureService {
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
    public static lectureGetLectures(
        fields?: Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
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
        sort?: ('title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        populate?: (string | 'content' | Array<'content'>),
        status?: 'draft' | 'published',
    ): CancelablePromise<{
        data: Array<{
            documentId: string;
            id: number;
            title: string;
            completed: boolean;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
            content?: Array<any>;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lectures',
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
    public static lecturePostLectures(
        fields?: Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'content' | Array<'content'>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                title: string;
                completed: '0' | '1' | 't' | 'true' | 'f' | 'false';
                publishedAt: string;
                content?: Array<any>;
            };
        },
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            title: string;
            completed: boolean;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
            content?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lectures',
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
    public static lectureGetLecturesById(
        id: string,
        fields?: Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'content' | Array<'content'>),
        filters?: Record<string, any>,
        sort?: ('title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        status?: 'draft' | 'published',
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            title: string;
            completed: boolean;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
            content?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lectures/{id}',
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
    public static lecturePutLecturesById(
        id: string,
        fields?: Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'content' | Array<'content'>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                title?: string;
                completed?: '0' | '1' | 't' | 'true' | 'f' | 'false';
                publishedAt?: string;
                content?: Array<any>;
            };
        },
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            title: string;
            completed: boolean;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
            content?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/lectures/{id}',
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
    public static lectureDeleteLecturesById(
        id: string,
        fields?: Array<'title' | 'completed' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'content' | Array<'content'>),
        filters?: Record<string, any>,
        status?: 'draft' | 'published',
    ): CancelablePromise<{
        data: {
            documentId: string;
            id: number;
            title: string;
            completed: boolean;
            createdAt?: string;
            updatedAt?: string;
            publishedAt: string;
            content?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lectures/{id}',
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
