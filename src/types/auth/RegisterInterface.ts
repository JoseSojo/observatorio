
export interface CreateRegisterInterface {
    name: string;
    lastname: string;
    username: string;
    email: string;
    ci: string;
    password: string;
    usertype: `OBRERO_ADMINISTRATIVO` | `ESTUDIANTE`
}

/**
 * RESPONSE SERVICE API
 */

export interface ResponseRegisterApi {
    body: any;
    message: string;
    error: boolean;
    errorMessage: string;
}
