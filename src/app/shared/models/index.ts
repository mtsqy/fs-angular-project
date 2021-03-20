export interface IEmployee {
    id: number,
    name: string,
    category: string,
}

export class User {
    id?: string;
    email?: string;
    password?: string;
    token?: string;
}

export class Tokens {
    jwt: string;
    refreshToken: string;
}
  