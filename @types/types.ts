export interface DALOptions {
    select?: string;
    sort?: object;
}

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    ID: string;
    ROLE: Roles;
}
