
export type METHOD_HTTP = `POST` | `PUT` | `GET` | `DELETE`;

export interface ResponseApi {
    message: string,
    error: boolean,
    body: any
}
