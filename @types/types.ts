export interface DALOptions {
    select?: string;
    sort?: object;
    upsert?: boolean;
}

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface TokenPayload {
    ID: string;
    ROLE: Roles;
}
