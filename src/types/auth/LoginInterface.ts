
export interface CreateLoginInterface {
    param: string;
    password: string;
}

/**
 * RESPONSE SERVICE API
 */

export interface ResponseLoginApi {
    body: {
        user: any,
        token: string
    };
    message: string;
    error: boolean;
    errorMessage: string;
}
