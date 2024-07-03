export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isActive: boolean,
}

export interface Token {
    expiresIn: number,
    accessToken: string,
    refreshToken: string,
}

export interface Login {
    email: string,
    password: string,
}

export interface LogInPayload {
    user: User,
    token: Token,
}

export interface SignUpPayload {
    user: User,
    password: string,
    token: Token,
}

export interface EmailCheck {
    emailExists: boolean
}
